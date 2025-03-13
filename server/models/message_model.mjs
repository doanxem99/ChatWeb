import mongoose from "mongoose";

const Message = mongoose.model(
    'message',
    new mongoose.Schema({
        text: { 
            type: String,
            require: true
        },
        users: [{
            type: mongoose.Types.ObjectId,
            require: true,
            ref: "User"
        }],
        sender: {
            type: mongoose.Types.ObjectId,
            require: true,
            ref: "User"
        },
        time: {
            type: Date
        }
    })
);