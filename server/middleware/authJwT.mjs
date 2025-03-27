import jwt, { decode } from "jsonwebtoken";
import db from "../config/connConfig.mjs";

const secret_key = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
  let token = req.headers["x-access-token"];
  
  if (!token) {
    res.status(403).send({ message: "Fail! No token provided." });
    return;
  }
  
  jwt.verify(token, secret_key, (err, decode) => {
    if (err) {
      res.status(401).send({ message: "Unauthorized!" + err.toString() });
      return;
    }
    req.userID = decode;
    next();
  });
}

async function isAdmin(req, res, next) {
  try {
    let user = await db.user.findById(req.userID);
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    let roles = await db.role.find({
      _id: { $in: user.roles },
    });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    res.status(403).send({ message: "Require Admin Role!" });
  } catch (err) {
    res.status(500).send({ message: "An unexpected error occured.\n" + err });
  }
}

async function isModerator(req, res, next) {
  try {
    let user = await db.user.findById(req.userID);
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    let roles = await db.role.find({
      _id: { $in: user.roles },
    });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        next();
        return;
      }
    }
    res.status(403).send({ message: "Require Moderator Role!" });
  } catch (err) {
    res.status(500).send({ message: "An unexpected error occured.\n" + err });
  }
}

export default {
  verifyToken,
  isAdmin,
  isModerator,
};
