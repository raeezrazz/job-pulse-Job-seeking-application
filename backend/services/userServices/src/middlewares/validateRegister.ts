import { Request,Response ,NextFunction } from "express";

export const validateRequest = (req: Request , res: Response , next: NextFunction) =>{
    const {username , email , password} = req.body
    const errors: { field: string; message: string }[] = [];

    if(!username){
        errors.push({field:"username",message:"Name is required"});
    }else {
        if (username.length < 3) errors.push({ field: "name", message: "Name must be at least 3 characters" });
        if (username.length > 20) errors.push({ field: "name", message: "Name cannot exceed 20 characters" });
        if (!/^[a-zA-Z]+$/.test(username)) {
          errors.push({
            field: "name",
            message: "Name can only contain letters"
          });
        }
      }
      if (!email) {
        errors.push({ field: "email", message: "Email is required" });
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          errors.push({ field: "email", message: "Invalid email format" });
        }
      }
      if (!password) {
        errors.push({ field: "password", message: "Password is required" });
      } else {
        if (password.length < 8) errors.push({ field: "password", message: "Password must be at least 8 characters" });
        if (!/[A-Z]/.test(password)) errors.push({ field: "password", message: "Password must contain at least one uppercase letter" });
        if (!/[a-z]/.test(password)) errors.push({ field: "password", message: "Password must contain at least one lowercase letter" });
        if (!/[0-9]/.test(password)) errors.push({ field: "password", message: "Password must contain at least one number" });
        if (!/[!@#$%^&*]/.test(password)) {
          errors.push({
            field: "password",
            message: "Password must contain at least one special character"
          });
        }
      }
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      next()
}