import { User } from "../models/user.models.js";
import bcrypt from "bcrypt"

export const registerUser = async (req, res) => {

    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                status: "failure",
                data: {
                    statusCode: 400,
                    value: "A user with that email address already exists"
                }
            })
        }
        user = await User.create({ username, email, password })

        let createdUser = await User.findOne({ _id: user._id }).select("-password")

        if (!createdUser) {
            return res.status(500).json({
                status: "failure",
                data: {
                    statusCode: 500,
                    value: "User could not be created because of some internal error"
                }
            })
        }

        return res.status(201).json({
            status: "success",
            data: {
                statusCode: 201,
                value: createdUser
            }
        })
    } catch (error) {
        console.log("Internal server error: " + error);
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.status(401).json({
                status: "failure",
                data: {
                    statusCode: 401,
                    value: "Please enter correct credentials"
                }
            })
        }
        let correctPassword = await bcrypt.compare(password,user.password)
        if(correctPassword){
            return res.status(200).json({
                status: "success",
                data: {
                    statusCode: 200,
                    value: {
                        userID: user._id,
                        username: user.username,
                        email: user.email
                    }
                }
            })
        }
        return res.status(401).json({
            status: "failure",
                data: {
                    statusCode: 401,
                    value: "Please enter the correct crendentials"
                }
        })
    } catch (error) {
        console.log("Error in loginRouter", error);
    }

}