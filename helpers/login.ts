import { AppError } from "../globalHandlers/AppError";
import prisma from "../lib/prisma";
import { LoginData } from "../types";
import { generateToken, isPasswordCorrect } from "../utils/hashPass";

export const login = async ({email, password}: LoginData) => {
    const userByEmail = await prisma.user.findUnique({
        where: {email}
    })

    if(!userByEmail){
        throw new AppError("No user exists with this email", 403)
    }
    console.log(userByEmail.password)
    const isPassCorrect = await isPasswordCorrect(password, userByEmail.password)
    if(!isPassCorrect){
        throw new AppError("Incorrect credentials", 403)
    }
    const name = userByEmail.name
    const token = generateToken({name, email}, process.env.JWT_SECRET_KEY!)
    return token
}
