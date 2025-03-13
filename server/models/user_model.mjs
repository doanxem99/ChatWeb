import mongoose from "mongoose";

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        username: String,
        password: String,
        email: String,
        phonenumber: String,
        roles: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Role"
            }
        ],
        friends: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User"
            }
        ]
    })
);

export default User;