import db from "../config/connConfig.mjs";

function allAccess(req, res) {
  res.status(200).send("Pulic content.");
}

function userAccess(req, res) {
  res.status(200).send("User content.");
}

function moderatorAccess(req, res) {
  res.status(200).send("Moderator content.");
}

function adminAccess(req, res) {
  res.status(200).send("Admin content.");
}

async function infoAccess(req, res) {
  try {
    const userID = req.params.id;
    const user = await db.user.findById(userID, "friends roomchats");
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    const [friendList, roomchatClist] = await Promise.all([
      db.user.find({ _id: { $in: user.friends }}, "username email"),
      db.roomchat.find({ _id: { $in: user.roomchats }}),
    ]);
    if (!friendList || !roomchatClist) {
      return res.status(404).send({ message: "Friends or Conversations not found." });
    }
    res.status(200).send({
      friendList,
      roomchatList: roomchatClist
    });
  } catch (error) {
    res.status(500).send({ message: "Error retrieving user information." + error});
  }
}

async function messageLoad(req, res) {
  try {
    const roomchatID = req.params.id;

    const messages = await db.message.find({ roomchat: { $in: roomchatID }})
                            .sort({ time: -1 })
                            .limit(20);
    messages.reverse();
                            
    res.status(200).send({ messages });
  }
  catch (err) {
    res.status(500).send({ message: err.toString() });
  }
}

async function messageSent(req, res) {
  try {
    let message = new db.message({
      text: req.body.text,
      roomchat: req.body.roomchat,
      sender: req.body.sender,
      time: req.body.date
    });

    // await message.save()
    let [roomchat, _] = await Promise.all([
      db.roomchat.findById(req.body.roomchat),
      message.save()
    ]);

    if (!roomchat) {
      res.status(404).send({ message: "Conversation not found" });
    }
    roomchat.lastMessage = req.body.text;
    roomchat.time = req.body.date;
    await roomchat.save();

    res.status(200).send({ message: message });
  }
  catch (err) {
    res.status(500).send({ message: err.toString() });
  }
}

export default {
  allAccess,
  userAccess,
  moderatorAccess,
  adminAccess,
  infoAccess,
  messageLoad,
  messageSent
};
