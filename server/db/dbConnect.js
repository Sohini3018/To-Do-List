import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb connected with the connection :${connection.connection.host}`);
    } catch (error) {
        console.log(`Error in Mongodb connection: ${error}`);
    }
}