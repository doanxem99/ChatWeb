import mongoose from "mongoose";
import User from "../models/user_model.mjs";
import Role from "../models/role_model.mjs";

mongoose.Promise = global.Promise
const connectionString = process.env.ATLAS_URI || "";
const DATABASE_NAME = "chatterdb";
const db = {};

db.user = User; 
db.role = Role;
db.mongoose = mongoose;
db.Roles = ["user", "admin", "moderator"];
// Connect to database name  DATABASE_NAME

db.mongoose
  .connect(connectionString, {
    dbName: DATABASE_NAME,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


async function initial() {
  let count = await Role.estimatedDocumentCount();
  if (count === 0) {
    await Promise.all(
      db.Roles.map(async role => {
        await new Role({ name: role }).save();
      })
    );
  }
}

export default db;