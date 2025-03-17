import User from '../../models/User.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import bcrypt from 'bcryptjs';

dotenv.config();

function processName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
}

// register a user
export const registerUser = async (req, res) => {
    const { firstName, lastName, email, gender, phoneNumber, password } = req.body;

    const requiredFields = ["firstName", "lastName", "email", "gender", "phoneNumber", "password"];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ error: `Missing or empty field: ${field}` });
        }
    }

    const processedFirstName = processName(firstName)
    const processedLasttName = processName(lastName)
    try {
        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.json({
                success: false,
                message: "User Already exists with the same email! Please try again",
            });
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            firstName: processedFirstName,
            lastName: processedLasttName,
            email,
            gender,
            phoneNumber,
            password: hashPassword
        });

        await newUser.save();

        res.status(200).json({
            success: true,
            message: "Registration successful",
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

export const getUsers = async (req, res) => {
    try {

        const existUser = await User.find();

        if (!existUser.length) {
            return res.status(400).json({ message: 'user not found...' });
        }
        return res.status(200).json({ status: "success", message: "Users fetch succesfully...", data: existUser });


    } catch (error) {
        return res.status(500).json({ errorMessage: error.message });
    }
}

export const getuser = async (req, res) => {
    try {

        const uid = req.params.id;

        if (!uid) {
            return res.status(400).json({ status: "error", message: "User not found..." });
        }

        const userData = await User.findById(uid);

        if (!userData) {
            return res.status(404).json({ status: "error", message: "Something went  wrong..." })
        }

        return res.status(200).json({ status: "success", message: "User found", data: userData });

    } catch (error) {
        return res.status(500).json({ errorMessage: error.message });
    }

}

export const updateUser = async (req, res) => {
    try {
        const uid = req.params.id;
        const userExist = await User.findById(uid);

        if (!userExist) {
            return res.status(404).json({ message: "User Is Not Found..." });
        }

        const { firstName, lastName, gender, phone, password } = req.body
        const image = req?.file?.filename;

        const updatedUser = await User.findByIdAndUpdate(uid, { firstName, lastName, gender, phone, password, image }, {
            new: true
        })

        res.status(200).json({ message: "Update User Succesfully...", data: updatedUser });





    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const uid = req.params.id;

        const deletedUser = await User.findByIdAndDelete(uid);
        res.status(200).json({ message: "User Deleted Succesfully...", data: deletedUser });

    } catch (error) {
        return res.status(500).json({ errorMessage: error.message });
    }
};


//login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser)
            return res.json({
                success: false,
                message: "User doesn't exists! Please register first",
            });

        const isMatching = await bcrypt.compare(
            password,
            checkUser.password
        );
        if (!isMatching)
            return res.json({
                success: false,
                message: "Incorrect password! Please try again",
            });

        const token = jwt.sign(
            {
                id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,
                phoneNumber: checkUser.phoneNumber,
                firstName: checkUser.firstName,
                lastName: checkUser.lastName,
                image: checkUser.image
            },
            "CLIENT_SECRET_KEY",
            { expiresIn: "60m" }
        );

        // res.cookie("token", token, { httpOnly: true, secure: true }).json({
        //     success: true,
        //     message: "Logged in successfully",
        //     user: {
        //         email: checkUser.email,
        //         role: checkUser.role,
        //         id: checkUser._id,
        //         firstName: checkUser.firstName,
        //         lastName: checkUser.lastName,
        //         image: checkUser.image
        //     },
        // });


        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                firstName: checkUser.firstName,
                lastName: checkUser.lastName,
                image: checkUser.image
            }
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

export const logoutUser = (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "Logged out successfully!",
    });
};

//auth middleware
// export const authMiddleware = async (req, res, next) => {
//     const token = req.cookies.token;
//     if (!token)
//         return res.status(401).json({
//             success: false,
//             message: "Unauthorised user!",
//         });

//     try {
//         const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(401).json({
//             success: false,
//             message: "Unauthorised user!",
//         });
//     }
// };

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({
            success: false,
            message: "Unauthorised user!",
        });

    try {
        const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorised user!",
        });
    }
};