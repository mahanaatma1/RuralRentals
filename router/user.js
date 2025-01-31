const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signupUser));

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/users/login",
            failureFlash: true,
        }),
        userController.loginUser
    );

router.get("/logout", userController.logoutUser);

router.get("/verify-email", wrapAsync(userController.verifyUserEmail));

router
    .route("/forgot-password")
    .get(userController.renderForgotPasswordForm)
    .post(wrapAsync(userController.forgotPassword));

router.post("/CheckOTP", wrapAsync(userController.checkOtp));

router.post("/Reset-password", wrapAsync(userController.resetPassword));

module.exports = router;