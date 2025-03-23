const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false,
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    addresses: [
        {
            country: String,
            city: String,
            address1: String,
            address2: String,
            zipCode: String,
            addressType: String,
        }
    ],
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
});

module.exports = mongoose.model("User", userSchema);
