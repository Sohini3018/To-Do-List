import { User } from "../models/user.models";

export const registerUser = async (req, res) => {

    const { username, email, password } = req.body;
    try {
        let user = User.findOne({ email })
        if (user) {
            res.status(400).json({
                status: "failure",
                data: {
                    statusCode: 400,
                    value: "A user with that email address already exists"
                }
            })
        }
        user = User.save({username, email, password})
        let userCreated = user.findOne({email}).select("-password")
        res.status(201).json({
            status:"success",
            data:{
                statusCode: 201,
                value: userCreated
            }
        })
    } catch (error) {
        console.log("Internal server error: " + error);
    }
}