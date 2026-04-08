import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_PAYLOAD } from "../types"

export const hashPass =async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword as string
}

export const isPasswordCorrect =async (password: string, hashedPassword: string) => {
    const isPasswordCorrect =await bcrypt.compare(password, hashedPassword)
    return isPasswordCorrect
}

export const generateToken = (data: JWT_PAYLOAD, secret_key: string) => {
    const token = jwt.sign(data, secret_key, {expiresIn: "1h"})
    return token as string
}