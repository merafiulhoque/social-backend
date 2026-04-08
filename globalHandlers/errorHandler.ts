
import { AppError } from "./AppError";

const errorHandler = (err: any, req: any, res: any, next: any) => {
    console.error(err.stack);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    // unknown errors
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};

export default errorHandler;