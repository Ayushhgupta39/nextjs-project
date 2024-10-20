import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { Error } from "mongoose";

export async function sendVerificationEmail({
  email,
  username,
  verifyCode,
}: {
  email: string;
  username: string;
  verifyCode: string;
}): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Confirm your account",
      react: VerificationEmail({
        firstName: username,
        verificationCode: verifyCode,
      }),
    });
    return {
      success: true,
      message: "Verification email sent successfuly.",
    };
  } catch (error) {
    console.error(
      "Error sending verification email: ",
      (error as Error).message
    );
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
