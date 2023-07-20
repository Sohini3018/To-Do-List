import dotenv from "dotenv"
import express from "express"
import { connectToDB } from "./db/dbConnect.js"
import cors from "cors"

dotenv.config({
    path: "./.env"
})


const app = express()
app.use(express.json())
app.use(cors())

connectToDB()

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Listening on ${port}`);
})


