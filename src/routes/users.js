const express = require("express");
const router = express.Router();
const userController = require('../controller/users.js');

// Import der Validierung
const userValidations = require('../validations/userValidation.js');
const authUser = require('../middleware/authUser.js');

// Import des JWT 
/* const signAccessToken = require('../index.js');
const verifyToken = require('../index.js'); */


router.route("/")
.get(userController.getAllUser)
// .post(userController.createUser);
.post(
    userValidations.password,
    userValidations.username,
    userController.createUser
)

router.route("/login")
.post(userController.loginUser)


router.route("/:id")
    // authorized
.get(
    authUser.authorize, userController.getUser)
// .put(userController.updateUser)
.put(
    userValidations.password,
    userValidations.username,
    userController.updateUser
)
.delete(userController.deleteUser); 

/* router.route("/auth")
.post() */

/// JWT Login 


/* router.route("/users/dashboard")
.get(
    authorize.loggedIn
)

// 

router.route("/logout")
.post(
    authorize.loggedOut
) */

// route protected
// rout unprotected

///

module.exports = router;