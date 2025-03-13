import express from "express"
import userController from "../controllers/userController.mjs"
import authJwT from "../middleware/authJwT.mjs"

const router = express.Router();
const API_URL = "/api/chatter"

// Set the Content-Security-Policy header
router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get(API_URL + "/infoaccess/:id",
    authJwT.verifyToken,
    userController.infoAccess
);

router.get(API_URL + "/messageaccess",
    authJwT.verifyToken,
    userController.messageAccess
);

router.get(API_URL + "/allaccess",
    userController.allAccess
);

router.get(API_URL + "/useraccess",
    authJwT.verifyToken,
    userController.userAccess
);

router.get(API_URL + "/modaccess",
    [
        authJwT.verifyToken,
        authJwT.isModerator
    ],
    userController.moderatorAccess
);

router.get("/api/chatter/adminaccess",
    [
        authJwT.verifyToken,
        authJwT.isAdmin
    ],
    userController.adminAccess
);

export default router;