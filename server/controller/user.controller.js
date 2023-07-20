import { User } from "../models/user.models.js";

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
            return res.status(409).json({
                status: "failure",
                data: {
                    statusCode: 429,
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