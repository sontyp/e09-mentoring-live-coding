import { Router } from "express";
import { registerNewUser, login } from "../controller/user.controller.js";

// Create new Router instance
const authRouter = Router();

// Route definition for /register
authRouter.route('/register')
    .post(registerNewUser);

// Route definition for /login
authRouter.route('/login')
    .post(login);

export default authRouter;