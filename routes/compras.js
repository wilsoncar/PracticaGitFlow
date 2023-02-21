const express = require('express');
const jwt = require('jwt-simple');
const UserService = require('../services/activate-user');

function userApi(app) {
    const router = express.Router();
    app.use("/api/activate-user", router);

    const userService = new UserService();
    

    router.put("/", async function (req, res, next) {
        const { body: user } = req;
        try {
            const usr = await userService.getUser(user.id);
            console.log('uno');
            console.log('dos');
            if (usr) {
                const decoded = jwt.decode(usr.token, 'dog');
                if (decoded.exp && decoded.sub === user.tk) {
                    usr.status = true;
                    console.log('tres');
                    const updateUsr = await userService.updateUser(usr, usr._id);
                    console.log('cuatro');
                    res.status(200).json({
                        data: updateUsr,
                        example: updateUsr,
                        message: 'user selected successfully'
                    });
                }
            }
        } catch (err) {
            next(err);
        }
    });

}
console.log("websocket");
module.exports = userApi;