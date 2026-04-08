import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../globalHandlers/asyncHandler";
import { loginSchema } from "../validation/userSchema";
import { AppError } from "../globalHandlers/AppError";
import { login } from "../helpers/login";

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