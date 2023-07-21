import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
        username: {
            type: String,
            required: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        }
    },
    { timestamps: true }
)

userSchema.pre("save",async function(){
    this.password = await bcrypt.hash(this.password,10)
})

export const User = mongoose.model("User", userSchema)