import { Todo } from "../models/todo.models.js"
import { User } from "../models/user.models.js"
import { ObjectId } from "mongoose"

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

export const getTodo = async (req, res) => {
    const { userId } = req.params
    console.log(userId);
    try {
        const userGot = await User.findOne({ _id: userId })
        if (!userGot) {
            return res.status(404).json({
                status: "failure",
                data: {
                    statusCode: 404,
                    value: "Enter correct user details"
                }
            })
        }
        const todoGot = await Todo.find({ user: userId })
        return res.status(200).json({
            status: "success",
            data: {
                statusCode: 200,
                value: todoGot
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "failure",
            data: {
                statusCode: 500,
                value: "Internal Server Error",
            }
        })
    }

}

export const deleteTodo = async (req, res) => {
    const { todoId } = req.params
    try {
        const todoGot = await Todo.findOneAndDelete({ _id: todoId })
        if (!todoGot) {
            return res.status(404).json({
                status: "failure",
                data: {
                    statusCode: 404,
                    value: "No todo found to be deleted"
                }
            })
        }
        return res.status(200).json({
            status: "success",
            data: {
                statusCode: 200,
                value: "Todo deleted successfully"
            }
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "failure",
            data: {
                statusCode: 500,
                value: "Internal Server Error" + error.message,
            }
        })
    }

}

export const updateTodo = async (req, res) => {
    const { todoId } = req.params
    const { todo } = req.body
    try {
        const todoGot = await Todo.findOneAndUpdate({ _id: todoId }, { $set: { todo: todo } })
        if (!todoGot) {
            return res.status(404).json({
                status: "failure",
                data: {
                    statusCode: 404,
                    value: "Not found any todo to delete"
                }
            })
        }
        return res.status(200).json({
            status: "failure",
            data: {
                statusCode: 200,
                value: "Todo updated successfully"
            }
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "failure",
            data: {
                statusCode: 500,
                value: "Internal Server Error" + error.message,
            }
        })
    }
}