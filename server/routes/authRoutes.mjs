import express from "express";
import verifySignUp from "../middleware/verifySignUp.mjs";
import authController from "../controllers/authController.mjs";

const router = express.Router();

// Set the Content-Security-Policy header
// router.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Headers",
//     "x-access-token, Origin, Content-Type, Accept",
//   );
//   next();
// });

router.post(
  "/api/auth/signup",
  [verifySignUp.checkDuplicateUser, verifySignUp.checkRolesExisted],
  authController.signUp,
);

router.post("/api/auth/signin", authController.signIn);

export default router;
