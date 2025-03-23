const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { upload } = require('../config/multer');

const router = express.Router();

router.post('/create-user', upload.single('file'), async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const file = req.file;

        if (!name || !email || !password || !file) {
            return res.status(400).json({ error: "All fields are required, including an avatar file." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists. Please log in." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            avatar: {
                public_id: name.replace(/\s+/g, "_").toLowerCase(),
                url: file.filename
            }
        });

        await newUser.save();
        return res.status(201).json({ message: "User created successfully!" });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({ error: "Invalid email or password." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        return res.status(200).json({ message: "Login successful!" });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
});

module.exports = router;
