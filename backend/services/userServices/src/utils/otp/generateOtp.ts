
export const generateOtp = () => {
    const otp = `${Math.floor(3000 + Math.random() * 900)}`;

    console.log(otp, 'otp in otp generator ');

    return otp
}
