import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    todo: {
        type: String,
        required: [true, "Todo is required"],
    },
    isComplete: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
},
    { timestamps: true }
)

export const Todo = mongoose.model("Todo", todoSchema)