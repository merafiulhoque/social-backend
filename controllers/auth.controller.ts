import { Request, Response } from "express";
import { asyncHandler } from "../globalHandlers/asyncHandler";
import { AppError } from "../globalHandlers/AppError";
import { login } from "../helpers/login";
import { UserCreationData } from "../types";
import { createUser } from "../helpers/createUser";
import { userSignUpSchema } from "../validation/dataValidation/userSchema";
import { loginSchema } from "../validation/dataValidation/userSchema";

export const loginController = asyncHandler(
    async (req: Request, res: Response) => {
        const {email, password} = req.body
        const result = loginSchema.safeParse({email, password})
        if(!result.success){
            throw new AppError(`${JSON.stringify(result.error.flatten().fieldErrors)}`, 422)
        }
        const token = await login({email, password})
        res.status(200).json({success: true, message: "Logged in Successfully"})
    }
)

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

export const logoutController = asyncHandler(
    async (req: Request, res: Response) => {
        res.clearCookie("token").json({success: true, message: "Logged out successfully"})
    }
)