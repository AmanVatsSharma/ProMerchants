import { Resend } from 'resend'

const resend  = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async ( email : string, token: string ) => {
    const confirmLink = `https://pro-merchants.vercel.app/auth/email-verification?token=${token}`

    await resend.emails.send({
        from: "onboarding@biggamegraphics.in",
        to: email,
        subject: "Confirm your email",
        html: `<p> Click <a href='${confirmLink}'>here</a> to confirm your email ProMerchants</p>`
    });
};