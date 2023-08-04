import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/Error.js";

// register user
export const registerUser = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already registered, Please login!",
      });
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      userName: userName,
      email: email,
      password: hashedPassword,
      tasks: [],
    });

    await newUser.save();
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (err) {
    return next(createError(err.status, err.message));
  }
};

// login user

export const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    bcrypt.compare(req.body.password, user.password, (err, isPassword) => {
      if (err || !isPassword) {
        return next(createError(404, "Invalidd email or password!"));
      } else {
        const token = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT
        );

        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .json({
            success: true,
            message: "User login successfully",
            user,
          });
      }
    });
  } catch (err) {
    return next(createError(err.status, err.message));
  }
};

export const userInfo = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).send({
      success: true,
      messsage: "User getting successfully",
      user,
    });
  } catch (error) {
    return next(createError(err.status, err.message));
  }
};
