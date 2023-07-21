import dotenv from "dotenv"
import express from "express"
import { connectToDB } from "./db/dbConnect.js"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import todoRouter from "./routes/todo.routes.js"

dotenv.config({
    path: "./.env"
})

connectToDB()

const app = express()
app.use(express.json())
app.use(cors())


app.use("/api/v1/users",userRouter)
app.use("/api/v1/todo",todoRouter)

const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`Listening on ${port}`);
})


