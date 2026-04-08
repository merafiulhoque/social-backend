import express from "express"
import cors from "cors"

//app configuration
const app = express()


//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:5173"
}))





//users related routes
import userRouter from "./routes/userRoutes"
app.use("/api/users", userRouter)


//global error handler
import errorHandler from "./globalHandlers/errorHandler"
app.use(errorHandler)
export default app