const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description  Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description  Login a existing user
 * @access Public
 */
authRouter.post("/login", authController.loginUserController);

/**
 * @route Get /api/auth/logout
 * @description  Logout a user
 * @access Public
 */
authRouter.get("/logout", authController.logoutUserController);

/**
 * @route Get /api/auth/get-me
 * @description  Get the logged in user details
 * @access Private
 */
authRouter.get(
  "/get-me",
  authMiddleware.authUser,
  authController.getMeController,
);

module.exports = authRouter;
