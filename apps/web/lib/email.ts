import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY || "re_123456789");

export const EMAIL_SENDER = "CrochetVerse <onboarding@resend.dev>"; // Use 'onboarding' for testing or verified domain
