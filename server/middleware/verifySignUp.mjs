import db from "../config/connConfig.mjs";

async function checkDuplicateUser(req, res, next) {
    try {
        let user = await db.user.findOne({
            username: { $in: req.body.username }
        });
        if (user) {
            res.status(400).send({ message: "Fail! Username is already in use!" });
            return;
        }
    }
    catch (err) {
        res.status(500).send({ message: err.toString() });
    }
    next();
};

function checkRolesExisted(req, res, next) {
    try {
        if (req.body.roles) {
            for (let i = 0; i < req.body.roles.length; i++) {
                if (!db.Roles.includes(req.body.roles[i])) {
                    res.status(400).send({
                        message: `Fail! Role ${req.body.roles[i]} does not exist!`
                    });
                    return;
                }
            }
        }
    }
    catch (err) {
        res.status(500).send({ message: err.toString() });
    }
    next();
}

export default {
    checkDuplicateUser,
    checkRolesExisted
}