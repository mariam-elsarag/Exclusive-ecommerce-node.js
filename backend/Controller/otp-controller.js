import User from "../Model/user-model.js";
// service
import sendOtp from "../Service/twilioService.js";
// Utils
import AppErrors from "../Utils/AppError.js";
import CatchAsync from "../Utils/CatchAsync.js";

// generate otp
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const requestOtp = CatchAsync(async (req, res, next) => {
  const { phone_number } = req.body;
  if (!phone_number) {
    return next(
      new AppErrors({ phone_number: "phone number is required" }, 400)
    );
  }
  const otp = generateOtp();
  const user = await User.findOne({ phone_number });
  if (!user) {
    return next(new AppErrors({ phone_number: "phone number is wrong" }, 400));
  }
  try {
    await sendOtp(phone_number, otp);
    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000;
    user.save();
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
});
