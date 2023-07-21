import { Todo } from "../models/todo.models.js"
import { User } from "../models/user.models.js"

export const createTodo = async (req, res) => {
    const { todo, isComplete, user } = req.body
    try {
        const userGot = await User.findOne({ _id: user })
        if (!userGot) {
            return res.status(404).json({
                data: {
                    status: "failure",
                    data: {
                        statusCode: 404,
                        value: "User does not exist with id " + user
                    }
                }
            })
        }
        const todoCreated = await Todo.create({ todo, isComplete, user })
        const todoSend = await Todo.findOne({ _id: todoCreated._id })
        if (todoSend) {
            return res.status(201).json({
                status: 'success',
                data: {
                    statusCode: 201,
                    value: todoSend
                }
            })
        }
        return res.status(409).json({
            status: "failure",
            data: {
                statusCode: 409,
                value: "Todo cannot be created because of internal error"
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failure",
            data: {
                statusCode: 500,
                value: "Internal Server Error",
            }

        })
    }

}