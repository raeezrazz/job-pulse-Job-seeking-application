import nodemailer from "nodemailer"
import bcrypt from "bcryptjs";
import { ObjectId } from "mongoose";
import { IOtp } from "../interfaces/IOtp";
import { UserRepository } from "../repositories/UserRepository";
import { OtpRepository } from "../repositories/OtpRepository";

export class OtpService {
    private otpRepository: OtpRepository;
    private UserRepository: UserRepository;

    constructor(){
        this.otpRepository = new OtpRepository();
        this.UserRepository = new UserRepository()
    }

    async sendMail(email:string){

        const otpExist = await this.otpRepository.findOtp(email)

        if(otpExist){
            await this.otpRepository.removeOtp(email)
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth:{
                user: process.env.NODEMAILER_USERNAME,
                pass: process.env.NODEMAILER_PASSWORD
            },
        });

        try {
            console.log("otp verification email",process.env.NODEMAILER_USERNAME,process.env.NODEMAILER_PASSWORD)
            const otp = `${Math.floor(3000 + Math.random() * 900)}`;
            console.log(otp,"hgsha")

            const mailOptions = {
                from: "raheeskmekdy@gmail.com",
                to: email,
                subject: "Verify your email",
                html: `
                <html>
                <body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; padding: 20px;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                        <h1 style="color: #000;">JobPulse.</h1>
                        <h2 style="color: #333;">Verify Your Email Address</h2>
                        <p style="color: #555; line-height: 1.5;">Enter the following OTP code to verify your email address. This code will expire in 1 minutes:</p>
                        <p style="font-size: 24px; font-weight: bold; color: #007bff;">${otp}</p>
                        <p style="color: #555; line-height: 1.5;">If you did not request this verification, please ignore this email.</p>
                    </div>
                </body>
            </html>`,
            };

            const saltRound = 10;
            const hashedOtp = await bcrypt.hash(otp, saltRound);

            const otpData: IOtp = {
                email,
                otp:hashedOtp
            };

            await this.otpRepository.storeOtp(otpData);

            await transporter.sendMail(mailOptions);

        } catch (error) {
            console.log("error while sending mail :" , error)
        }


    }

    async verifyOtp(email:string , otp: string){
        console.log("here is the verify otp")
        
        const otpExist = await this.otpRepository.findOtp(email)
        console.log(otpExist,"otp exist result")
        if(!otpExist){
            console.log("otp not exist")
            return false
        }
        const validateOtp = await bcrypt.compare(otp,otpExist.otp)
        console.log(validateOtp)
        if(validateOtp){
            await this.otpRepository.removeOtp(email)
            console.log("here is otp")
            return true
        }else{
            return false
        }
    }


}