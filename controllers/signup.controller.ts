import { NextFunction, Request, Response } from "express"
import { asyncHandler } from "../globalHandlers/asyncHandler"
import { userSignUpSchema } from "../validation/userSchema"
import { createUser } from "../helpers/createUser"
import { UserCreationData } from "../types";
import { AppError } from "../globalHandlers/AppError";

export const signupController = asyncHandler(
    async (req: Request, res: Response) => {
        const {name , email, password}: UserCreationData = req.body
        const result = userSignUpSchema.safeParse({
            name, email, password
        })

        if(!result.success){
            throw new AppError(`${JSON.stringify(result.error.flatten().fieldErrors)}`, 422)
        }
        await createUser({name, email, password})
        res.status(201).json({success: true, message: "User created Successfully"})
    }
)