import IUser from "../interfaces/IUser";
import { UserService } from "./../services/userService";
import { Request, Response } from "express";
import { OtpService } from "../services/otpService";

export class UserController {
  private userService: UserService;
  private otpService: OtpService;

  constructor() {
    this.userService = new UserService();
    this.otpService = new OtpService();
  }

  public registerUser = async (req: Request, res: Response): Promise<any> => {
    console.log("here reacjed in register", req.body);
    try {
      const { name, email, password } = req.body;

      const userExists = await this.userService.userExist(email);
      if (userExists) {
        return res
          .status(400)
          .json({ already: true, message: "user already exist" });
      }

      //  const form:IUser = { name,email,password }

      const form: IUser = { name, email, password } as IUser;
      const { user, accessToken, refreshToken } =
        await this.userService.registerUser(form);

      res.cookie("jwt-refresh", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/refresh-token",
      });

      this.otpService.sendMail(email);

      return res.status(201).json({
        success: true,
        data: user,
        accessToken,
        message: "User Reguister successfull",
      });
    } catch (error) {
      return res.status(500).json({ message: "server error", error });
    }
  };

  public resentOtp = async (req: Request, res: Response): Promise<any> => {
    try {
      const { email } = req.body;
      const userExist = await this.userService.userExist(email);

      if (!userExist) {
        return res
          .status(400)
          .json({ already: true, message: "user does not exist" });
      }

      await this.otpService.sendMail(email);

      return res.status(200).json({
        success: true,
        message: "Resent Otp sent successfully",
      });
    } catch (error) {
      console.log("Error with Resend Otp", error);
      return res.status(500).json({ message: "server error", error });

    }
  };

  public verifyOtp = async (req: Request, res: Response): Promise<any> => {
    console.log(req.body);
    try {
      const { email, otp } = req.body;
      const userExists = await this.userService.userExist(email);
      if (!userExists) {
        return res
          .status(400)
          .json({ already: true, message: "user not found" });
      }

      const verifyOtp = await this.otpService.verifyOtp(email, otp);
      console.log("otp verify complete",verifyOtp)
      if(!verifyOtp){
        console.log("this worked")
        return res.status(400).json({invalidOtp:true,message:"Invalid Otp"})
      }
        console.log("this is worled 2")
        const changeStatus = await this.userService.verifyUser(email);
      console.log("otp verify 2")

      if(!changeStatus){
        return res.status(400).json({failed:true,message:"User Verification failed"})
      }
      return res.status(200).json({success:true,message:"User successfully Verified"})
      
    } catch (error) {
      console.log("Error with verify Otp", error);
      return res.status(500).json({ message: "server error", error });

    }
  };
}
