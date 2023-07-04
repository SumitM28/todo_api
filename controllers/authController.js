import createError from "../utils/Error.js";
import { comparePassword, hashPassword } from "../utils/authUtils.js";
import JWT from "jsonwebtoken";
import userModel from "../models/User.js";
// register controller
export const registerController = async (req, res, next) => {
  try {
    const { name, email, password, address, phone, question } = req.body;

    // validataion
    if (!name) {
      return next(createError(400, "Name is required"));
    }
    if (!email) {
      return next(createError(400, "Email is required"));
    }
    if (!password) {
      return next(createError(400, "Password is required"));
    }

    //existing user
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered Please Login",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);
    const newUser = await new userModel({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      address: address,
      question: question,
    });
    await newUser.save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return next(createError(500, "Error in registration"));
  }
};

// login controller
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return next(createError(400, "Invalid email or password"));
    }

    // check user
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return next(createError(200, "Invalid Password"));
    }

    // token creation
    const token = await JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        question: user.question,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (error) {
    return next(createError(error.status, error.message));
  }
};
