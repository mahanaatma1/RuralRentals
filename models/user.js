const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const crypto = require("crypto");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        default: null
    },
    verificationTokenExpires: {
        type: Date,
        default: null
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

// Add methods for verification
userSchema.methods.generateVerificationToken = function() {
    const token = crypto.randomBytes(20).toString('hex');
    this.verificationToken = token;
    this.verificationTokenExpires = Date.now() + 3600000; // 1 hour
    return token;
};

userSchema.methods.generatePasswordResetToken = function() {
    const token = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = token;
    this.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    return token;
};

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userSchema);