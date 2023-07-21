import * as UserModel from "../model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

// Controller function for the creation of a new user-entry
export async function registerNewUser(req, res) {
    let body = req.body;

    // Override the password-property in the request body with a hash of the password
    body.password = bcrypt.hashSync(body.password, 10);

    try {
        // Call model-function for insertion of a new user entry
        await UserModel.insertNewUser(body);

        // Send success message
        res.send({success: true});

    } catch (error) {
        // TODO exhaustive error checking would be needed. Possible errors: 400 (BAD REQUEST) & 409 (CONFLICT)
        res.status(error.code).send({error: error.message});
    }
}

// Controller function for logging in an existing user
export async function login(req, res) {
    // extract user credentials from the request body
    let { username, password } = req.body;

    // Try to fetch user-entry from DB by username
    let user = await UserModel.findUserByUsername(username);

    // If user-entry not found
    if (user === null) {
        // Send a 401 (UNAUTHORIZED) with a message
        res.status(401).send({
            success: false,
            message: 'Incorrect username or password'
        });
        // early return
        return;
    }

    // Compare the sent password with the hashed one in the DB-entry for the user
    if (bcrypt.compareSync(password, user.password)) {
        // Create a new JWT token with a payload and an expiration after one hour (60 minutes * 60 seconds)
        let token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });

        // Send successful response including an access token in the a httpOnly cookie in the HTTP header
        res
            .cookie('access_token', 'Bearer ' + token, {
                httpOnly: true,
                domain: 'localhost',
                expires: new Date(Date.now() + 8 * 60 * 60 * 1000) // cookie will be removed after 8 hours (hours * minutes * seconds * milliseconds)
            })
            .send({
                success: true,
                message: `User ${user.username} logged in successfully!`,
                id: user._id,
                fullname: user.fullname,
                token: token
            });

    } else {
        // Password wrong -> send error message along with a 401 (UNAUTHORIZED)
        res.status(401).send({
            success: false,
            message: 'Incorrect username or password'
        });
    }
}