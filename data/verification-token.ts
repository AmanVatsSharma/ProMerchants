import { prisma } from "@/lib/prisma"


export const getVerificationTokenByEmail = async ( email: String ) => {
    try {
        const verificationToken = await prisma.verificationToken.findFirst(
            {
                where: { email }
            }
            return verificationToken;
        )
    } catch {
        return null 
    }
}

export const getVerificationTokenByToken = async ( token: String ) => {
    try {
        const verificationToken = await prisma.verificationToken.findUnique(
            {
                where: { token }
            }
            return verificationToken;
        )
    } catch {
        return null 
    }
}