import { getUserData } from "./../../../../../frontend/src/api/userApi";
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

  public login = async (req: Request, res: Response): Promise<any> => {
    console.log("loginworking", req.body);

    try {
      const { email, password } = req.body;
      const { userData, accessToken, refreshToken } = await this.userService.login(
        email,
        password
      );

      res.cookie("jwt-refresh", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/refresh-token",
      });
      console.log("login success and response going")
      res.status(200).json({
        success: true,
        data: userData,
        accessToken: accessToken,
        message: "User Login Successfull",
      });
    } catch (err:unknown) {
      const error = err as Error;
      console.error("Login failed:", error.message);

      // Handle specific errors
      if (error.message === "Invalid email or password") {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // For any other errors
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

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
      console.log("ere is the user info data stored in the backend", user);
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
      console.log("otp verify complete", verifyOtp);
      if (!verifyOtp) {
        console.log("this worked");
        return res
          .status(400)
          .json({ invalidOtp: true, message: "Invalid Otp" });
      }

      console.log("this is worled 2");

      const changeStatus = await this.userService.verifyUser(email);
      console.log("otp verify 2");

      if (!changeStatus) {
        return res
          .status(400)
          .json({ failed: true, message: "User Verification failed" });
      }
      return res
        .status(200)
        .json({
          success: true,
          data: changeStatus,
          message: "User successfully Verified",
        });
    } catch (error) {
      console.log("Error with verify Otp", error);
      return res.status(500).json({ message: "server error", error });
    }
  };

  public getUserData = async (req: Request, res: Response): Promise<any> => {
    try {
      const { userId } = req.body;
      const user = await this.userService.getUserData(userId);
      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json({
        message: "User found successfully",
        data: user,
      });
    } catch (error) {
      console.log("Internal server error while fetching userData", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };

  public changePassword = async (req: Request , res:Response): Promise<any> =>{
    try {
      const {email , oldPassword , newPassword} = req.body
    
      const result = await this.userService.changePassword(email, oldPassword, newPassword);
      if(result){
        res.status(200)
        .json({
          success:true,
          message:"User password changed successfully"
        })
      }

    } catch (error) {
      res.status(500).json({
        message:'Internal Server Error'
      })
    }
  }
}
