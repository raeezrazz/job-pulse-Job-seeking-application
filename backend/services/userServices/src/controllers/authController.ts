import { IUser } from "../interfaces/userTypes";
import { UserService } from "../services/userService";
import { AuthService } from "../services/authService";
import { Request, Response } from "express";
import { OtpService } from "../services/otpService";
import { RegisterUserDTO } from "../interfaces/userTypesDTO";

export class AuthController {
  private userService: UserService;
  private otpService: OtpService;
  private authService: AuthService;

  constructor() {
    this.userService = new UserService();
    this.otpService = new OtpService();
    this.authService = new AuthService();
  }

  public registerUser = async (req: Request, res: Response): Promise<any> => {
    const data: RegisterUserDTO = req.body;

    try {
      const user = await this.authService.registerUser(data);

      

      await this.otpService.sendMail(data.email);

      return res.status(201).json({
        success: true,
        data: user,
        message: "User registration successful",
      });
    } catch (error:any) {
        console.log(error.message,"here is the login error")
      if (error.message.includes("already exists")) {
        return res.status(409).json({ message: "User already exists" });
      }
      return res.status(500).json({ message: "Server error", error });
    }
  };
}
