const router = require('express').Router();
const { upload } = require('../config/multer');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

// Create User Route
router.post('/create-user', upload.single('file'), [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'Avatar file is required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            logger.warn(`User creation attempted with existing email: ${email}`);
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS, 10));
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            avatar: {
                public_id: name,
                url: file.filename
            }
        });

        await newUser.save();
        logger.info(`User created successfully: ${email}`);
        return res.status(201).json({ message: 'User created successfully', user: { name, email, avatar: file.filename } });

    } catch (error) {
        logger.error(`Error in create-user: ${error.message}`);
        return res.status(500).json({ error: 'An error occurred while creating the user' });
    }
});

// Login Route
router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            logger.warn(`Login attempt with non-existent email: ${email}`);
            return res.status(404).json({ error: 'Invalid email or password' });
        }

        const isAuthorisedUser = await bcrypt.compare(password, user.password);
        if (!isAuthorisedUser) {
            logger.warn(`Login attempt with incorrect password for email: ${email}`);
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        logger.info(`User logged in successfully: ${email}`);
        return res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });

    } catch (error) {
        logger.error(`Error in login: ${error.message}`);
        return res.status(500).json({ error: 'An error occurred during login' });
    }
});

module.exports = router;