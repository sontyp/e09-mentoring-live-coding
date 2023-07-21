import { Router } from "express";
import jwt from 'jsonwebtoken';

// Middleware-function for validation of the token in the header/cookie
function verifyToken(req, res, next) {
    // If the auth token is not present in the header/cookies, return an error and stop
    // if (!req.headers.authorization) return res.status(401).send({success: false, message: 'Token missing'});
    if (!req.cookies.access_token) return res.status(401).send({success: false, message: 'Token missing'});

    // Extract token from the authorization field in the HTTP header or cookie
    // let token = req.headers.authorization.split(' ')[1];
    let token = req.cookies.access_token.split(' ')[1];

    // Verify extracted token via signature check
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        // If verification failed, send error message and stop
        if (err) return res.status(401).send({success: false, message: 'Invalid token'});

        // All fine, save the token payload in the request object
        req.tokenPayload = payload;

        // Proceed with request handling chain
        next();
    });
}


// Create new Router instance
const protectedRouter = Router();

// Register token-verfication-middleware for all endpoints of this router
protectedRouter.use(verifyToken);

// Route definition for the root-path
protectedRouter.route('/')
    .get((req, res) => {
        res.send({
            success: true,
            data: req.tokenPayload
        });
    });

protectedRouter.route('/test').get((req,res) => {
    res.send({
        success: true,
        data: req.tokenPayload
    });
})

export default protectedRouter;