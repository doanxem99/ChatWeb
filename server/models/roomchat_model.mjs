import mongoose from "mongoose";

const Roomchat = mongoose.model(
  "RoomChat",
  new mongoose.Schema({
    name: {
      type: String,
    },
    users: [
      {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: "User",
      },
    ],
    lastMessage: {
      type: String,
    },
    time: {
      type: Date,
      require: true
    },
  }),
);

export default Roomchat;
