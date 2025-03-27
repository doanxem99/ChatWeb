import mongoose from "mongoose";

const Message = mongoose.model(
  "Message",
  new mongoose.Schema({
    roomchat: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "RoomChat"
    },
    text: {
      type: String,
      require: true,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "User",
    },
    time: {
      type: Date,
      require: true
    },
  }),
);

export default Message;
