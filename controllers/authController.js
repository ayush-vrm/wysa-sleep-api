const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

// Signup
exports.signup = async (req, res) => {
    const { nickname, password, role } = req.body;
    try {

        if(!nickname|| !password){
            return res.status(400).json({
                success : false,
                message : "Fill all required fields"
            })
        }

        let user = await User.findOne({ nickname });

        if (user) {
            return res.status(400).json({
                success: false,
                message: 'Nickname already taken, try something else'
            });
        }

        user = new User({ nickname, password, role });
        await user.save();

        return res.status(200).json({
            success: true,
            message: "User registered successfully"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};

// User Login
exports.login = async (req, res) => {
    try {
        const { nickname, password } = req.body;

        if (!nickname || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again"
            });
        }

        const user = await User.findOne({ nickname });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not registered, please sign up",
            });
        }

        
        if (await bcrypt.compare(password, user.password)) {
            const payload = { id: user._id, role: user.role };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3h" });

            res.cookie("token", token, {
                expires: new Date(Date.now() + 3 * 60 * 60 * 1000), 
                httpOnly: true,
            }).status(200).json({
                success: true,
                token,
                user: { nickname: user.nickname, role: user.role },
                message: "Logged in Successfully"
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Login failure, please try again",
            error: error.message
        });
    }
};
