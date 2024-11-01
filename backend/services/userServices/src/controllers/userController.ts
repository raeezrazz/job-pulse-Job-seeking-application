import {IUser,IUpdatedUser} from "../interfaces/IUser";
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
    try {
      const { email, password } = req.body;
  
      // Attempt to log in the user using the userService
      const result = await this.userService.login(email, password);
      console.log("hererere",result)
      if (!result?.success) {
        console.log("inside")
        return res.status(401).json({
          success: false,
          message:result?.message,
        });
      }
      console.log("end")
      // Set the refresh token as a secure HTTP-only cookie
      res.cookie("jwt-refresh", result.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/refresh-token",
      });
  
      // Set the access token as a secure HTTP-only cookie
      res.cookie("accessToken", result?.accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 15 * 60 * 1000,
      });
  
      // Send a successful response
      return res.status(200).json({
        success: true,
        data: result.userData,
        message: "User login successful",
      });
    } catch (error) {
      // Log the error details for debugging purposes
      console.error("Login failed:", (error as Error).message);
  
      if ((error as Error).message === "Invalid email or password") {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }
  
      // For unexpected errors, return a generic error message
      return res.status(500).json({
        success: false,
        message: "Internal server error. Please try again later.",
      });
    }
  };

  public registerUser = async (req: Request, res: Response): Promise<any> => {
    console.log("here reacjed in register", req.body);
    try {
      const { name, email, password } = req.body;

      const userExists = await this.userService.userExist(email);
      if (userExists) {
        console.log("email already")
        return res
          .status(400)
          .json({ already: true, message: "user already exist" });
      }

      //  const form:IUser = { name,email,password }

      const form: IUser = { name, email, password } as IUser;
      const { user, accessToken, refreshToken } =
        await this.userService.registerUser(form);
        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: true, // set true if using https
          maxAge: 15 * 60 * 1000, // 15 minutes
        });+

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true, // set true if using https
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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


  public refreshTokenUpdate = async(req:Request , res: Response):Promise<any>=>{
    
    try{
    const refreshToken = req.cookies.refreshToken;
      console.log(refreshToken , "here is the refresh")
    if(!refreshToken){
      return res.status(403).json({
        message:'No refresh token found'
      });

      const generateNewRefreshToken = await this.userService.updateRefreshToken(refreshToken)

      res.cookie('refreshToken', generateNewRefreshToken, {
        httpOnly: true,
        secure: true, // set true if using https
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(200).json({
        message: "Token refreshed successfully",
        refreshToken: generateNewRefreshToken,
      });

    }

  }catch(err:any){
    return res.status(500).json({
      message: "Failed to refresh token",
      error: err.message,
    });
  }

  }



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
      const accessToken = req.cookies.accessToken
      console.log(accessToken,"acceddtoken")
      if(!accessToken){
        res.status(401)
        .json({
          message:"User Token not found"
        })
      }


      const user = await this.userService.getUserData(accessToken)
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

  public changePassword = async (req: Request, res: Response): Promise<any> => {
    try {
      const { email, oldPassword, newPassword } = req.body;
  
      const result = await this.userService.changePassword(email, oldPassword, newPassword);
      console.log(result,"result is sisisisisisissisisisisisisisisis")
      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message || "User password changed successfully",
        });
      } else {
        console.log("here else is working")
        return res.status(result.statusCode).json({
          success: false,
          message: result.message,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  public updateUserData = async (req: Request, res: Response): Promise<any> => {
    console.log(req.body, "Request body");
    
    try {
      const userData = req.body.userData;
      console.log(userData);
      
      const userExists = await this.userService.userExist(userData.email);
      console.log(userExists);
      
      if (!userExists) {
        return res.status(400).json({
          success: false,
          message: "User not found"
        });
      }
      
      const updateUserData = await this.userService.updateUserDetails(userData);
      
      if (updateUserData.success) {
        return res.status(200).json({
          success: true,
          message: "User details updated successfully",
          data: updateUserData 
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "User update failed"
        });
      }
    } catch (error) {
      console.log("Error in updating user data", error);
      
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating user data",
        error: error 
      });
    }
  };

  public logoutUser = async(req:Request , res:Response):Promise<any> =>{
    console.log("logout working")
    try {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return res.status(200).json({ success:true , message: 'Logged out successfully' });
    } catch (error) {
      console.log(error)

      return res.status(500)
      .json({
        success:false,
        message:"something went wrong while logouting"
      })
    }
  }
  public getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
      const loadAllUsers = await this.userService.loadAllUsers();
      
      // Convert the result to an array manually
      const usersArray = Array.isArray(loadAllUsers) ? loadAllUsers : [loadAllUsers];
  
      return res.status(200).json({
        success: true,
        message: "Users loaded successfully",
        data: usersArray, // Send the array of users
      });
  
    } catch (error) {
      console.error("Error loading users:", error);
      return res.status(500).json({
        success: false,
        message: "Error loading users",
        error: error, // Send the error message
      });
    }
  };
  
  
}
