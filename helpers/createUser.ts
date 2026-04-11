import { AppError } from "../globalHandlers/AppError";
import prisma from "../lib/prisma";
import { UserCreationData } from "../types";
import { hashPass } from "../utils/hashPass";


export const createUser = async ({name, email, password}: UserCreationData): Promise<void> => {
    const ifUserAlreadyExists = await prisma.user.findUnique({
        where: {email}
    })
    if(ifUserAlreadyExists){
        throw new AppError("User already exists", 409)
    }

    const hashedPassword =await hashPass(password)
    await prisma.user.create({
        data: {name, email, password: hashedPassword}
    })
}