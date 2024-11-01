import twilio from "twilio";
import CatchAsync from "./../Utils/CatchAsync.js";

const client = twilio(
  process.env.TWILLO_ACCOUNT_SID,
  process.env.TWILLO_AUTH_TOKEN
);
const sendOtp = async (phoneNumber, otp) => {
  try {
    const message = await client.messages.create({
      body: `Your verification code is: ${otp}`,
      from: `+20${process.env.TWILLO_NUMBER}`,
      to: `+2${phoneNumber}`,
    });
  } catch (err) {
    console.error(`Failed to send OTP: ${err.message}`);
    throw new Error("Failed to send OTP");
  }
};
export default sendOtp;
