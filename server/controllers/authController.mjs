import db from "../config/connConfig.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secret_key = process.env.SECRET_KEY;

async function signUp(req, res) {
  try {
    let user = new db.user({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    await user.save();

    // Save user data to database
    if (req.body.roles) {
      let roles = await db.role.find({
        name: { $in: req.body.roles },
      });
      user.roles = roles.map((role) => role._id);
      await user.save();
    } else {
      let role = await db.role.findOne({ name: "user" });
      user.roles = [role._id];
      await user.save();
    }
    res.status(200).send({ message: "User was registered successfully" });
  } catch (err) {
    res.status(500).send({ message: err.toString() });
  }
}

async function signIn(req, res) {
  try {
    let user;
    user = await db.user.findOne({
      username: { $in: req.body.username },
    });

    if (!user) {
      user = await db.user.findOne({
        email: { $in: req.body.username },
      });
    }

    if (!user) {
      res.status(404).send({ message: "User not found" });
    }

    let isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({
        accessToken: "",
        message: "Invalid password!",
      });
    }

    const token = jwt.sign({ id: user._id }, secret_key, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    let authority = [];
    for (let i = 0; i < user.roles.length; i++) {
      let role = await db.role.findOne({
        _id: { $in: user.roles[i] },
      });
      authority.push("ROLE_" + role.name.toUpperCase());
    }

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      phonenumber: user.phonenumber,
      roles: authority,
      accessToken: token,
      friends: user.friends,
    });
  } catch (err) {
    res.status(500).send({ message: err.toString() });
  }
}

export default {
  signUp,
  signIn,
};
