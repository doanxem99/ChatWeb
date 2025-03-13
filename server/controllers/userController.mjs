import db from "../config/connConfig.mjs";


function allAccess(req, res) {
    console.log(1);
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
    const userID = req.params.id;

    try {
        const user = await db.user.findById(userID, "friends");
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        const friendList = await db.user.findById(user.friends, "username email");
        if (!friendList) {
            return res.status(404).send({ message: "Friends not found." });
        }

        res.status(200).send({ friendList });
    } catch (error) {
        res.status(500).send({ message: "Error retrieving user information." });
    }
}

function messageAccess(req, res) {
    
}

export default {
    allAccess,
    userAccess,
    moderatorAccess,
    adminAccess,
    infoAccess,
    messageAccess
}