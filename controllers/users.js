const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const passport = require("passport");
const User = require("../models/user");
const { sendVerificationEmail } = require("../utils/verifyEmail");
const { sendOtpEmail } = require("../utils/otpEmail");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signupUser = async(req, res, next) => {
    try {
        let { email, username, password } = req.body;

        // Validate input
        if (!email || !username || !password) {
            req.flash("error", "All fields are required");
            return res.redirect("/users/signup");
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            req.flash("error", "Email is already registered");
            return res.redirect("/users/signup");
        }

        // Create new user
        const newUser = new User({
            email: email.toLowerCase(),
            username: username
        });

        // Register user with passport-local-mongoose
        const registeredUser = await User.register(newUser, password);

        // Generate verification token
        const verificationToken = registeredUser.generateVerificationToken();
        await registeredUser.save();

        // Send verification email
        const verificationLink = `${req.protocol}://${req.get('host')}/users/verify-email?token=${verificationToken}`;
        
        try {
            await sendVerificationEmail(email, verificationLink);
            req.flash("success", "Please check your email to verify your account");
            res.redirect("/users/login");
        } catch (err) {
            console.error("Email sending error:", err);
            req.flash("error", "Failed to send verification email");
            res.redirect("/users/signup");
        }
    } catch (err) {
        console.error("Signup error:", err);
        req.flash("error", err.message);
        res.redirect("/users/signup");
    }
};

module.exports.verifyUserEmail = async(req, res, next) => {
    const { token } = req.query;

    if (!token) {
        req.flash("error", "Invalid verification link");
        return res.redirect("/users/signup");
    }

    try {
        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpires: { $gt: Date.now() }
        });

        if (!user) {
            req.flash("error", "Invalid or expired verification link");
            return res.redirect("/users/signup");
        }

        // Verify user
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();

        req.flash("success", "Email verified successfully! You can now login");
        res.redirect("/users/login");
    } catch (err) {
        console.error("Verification error:", err);
        req.flash("error", "Error verifying email");
        res.redirect("/users/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.loginUser = async(req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            req.flash("error", "Invalid username or password");
            return res.redirect("/users/login");
        }

        if (!user.isVerified) {
            req.flash("error", "Please verify your email first");
            return res.redirect("/users/login");
        }

        passport.authenticate("local", {
            failureRedirect: "/users/login",
            failureFlash: true
        })(req, res, () => {
            req.flash("success", "Welcome back!");
            const redirectUrl = res.locals.redirectUrl || "/listings";
            res.redirect(redirectUrl);
        });
    } catch (err) {
        console.error("Login error:", err);
        req.flash("error", "Error during login");
        res.redirect("/users/login");
    }
};

module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("Success", "You are logged Out!");
        res.redirect("/listings");
    });
};

module.exports.renderForgotPasswordForm = (req, res) => {
    res.render("users/forgotPassword.ejs");
};

module,
(exports.forgotPassword = async(req, res, next) => {
    const email = req.body.email;
    if (!email) {
        req.flash("Error", "Email is missing");
        res.redirect("/users/forgot-password");
    }
    try {
        let user = await User.findOne({ email });
        if (!user) {
            req.flash("Error", "No user found with this email");
            res.redirect("/users/forgot-password");
            return;
        }
        let username = user.username;
        let otp = Math.floor(Math.random() * 100000);
        let hashOtp = crypto
            .createHash("sha256")
            .update(otp.toString())
            .digest("hex");
        req.session.passwordReset = { email, hashOtp };
        try {
            await sendOtpEmail(email, username, otp);
            req.flash("Success", "OTP sent to your email");
            res.redirect("/users/forgot-password");
        } catch (err) {
            req.flash("Error", "Fail to send OTP on email");
            res.redirect("/users/forgot-password");
            delete req.session.passwordReset;
            return;
        }
    } catch (err) {
        delete req.session.passwordReset;
        req.flash("Error", err.message);
        res.redirect("/users/forgot-password");
    }
});

module.exports.checkOtp = async(req, res, next) => {
    const otp = req.body.otp;
    if (!otp) {
        req.flash("Error", "OTP is missing");
        res.redirect("/users/forgot-password");
    }

    try {
        const info = req.session.passwordReset;
        let hashOtp = crypto
            .createHash("sha256")
            .update(otp.toString())
            .digest("hex");
        if (!info) {
            req.flash("Error", "Wrong Request");
            res.redirect("/users/forgot-password");
            return;
        }

        if (hashOtp == info.hashOtp) {
            req.flash("Success", "Welcome Back!");
            res.render("users/resetPassword.ejs");
        } else {
            req.flash("Error", "Wrong OTP, Try Again");
            res.redirect("/users/forgot-password");
        }
    } catch (err) {
        req.flash("Error", err.message);
        res.redirect("/users/forgot-password");
        delete req.session.passwordReset;
    }
};

module.exports.resetPassword = async(req, res, next) => {
    const { newPassword, Confirm_password } = req.body;
    const info = req.session.passwordReset;

    if (!newPassword || newPassword !== Confirm_password) {
        req.flash("Error", "Passwords do not match");
        res.redirect("/users/forgot-password");
        return;
    }
    try {
        const user = await User.findOne({ email: info.email });
        await user.setPassword(newPassword);
        await user.save();
        req.flash("Success", "Password Updated!");
        res.redirect("/users/login");
        delete req.session.passwordReset;
    } catch (err) {
        req.flash("Error", err.message);
        res.redirect("/users/forgot-password");
        delete req.session.passwordReset;
    }
};