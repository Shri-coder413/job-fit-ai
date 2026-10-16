const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @name registerUserController
 * @description register a new user, expects username, email and passowrd in the request body
 * @access Public
 */
async function registerUserController(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please Provide your username, email and password",
      });
    }

    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExist) {
      return res.status(400).json({
        message: "Account already exists with this email adress or username.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    /* Handle duplicate key errors */
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }

    /* Log unexpected errors on the server */
    console.error("Registration error:", error);

    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { registerUserController };
