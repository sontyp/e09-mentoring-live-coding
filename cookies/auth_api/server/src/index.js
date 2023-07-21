import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectToDb } from './service/db.service.js';
import authRouter from './routes/auth.route.js';
import protectedRouter from './routes/protected.route.js';


// Load enviroment variables from the .env file
dotenv.config();

// Initialize express
const app = express();

// Middleware for body-parsing
app.use(express.json());

// Middle for cookie-parsing
app.use(cookieParser());

// Middleware for CROSS-ORIGIN-REQUEST
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// --------------------- ROUTES -------------------------
app.use('/auth', authRouter);

app.use('/protected', protectedRouter);

// Connect to the DB once via the default connection
await connectToDb();

// ----------------------------------------------------------
// Start the server on the port specified in the .env file
app.listen(process.env.API_PORT, () => {
    console.log(`Server is listening on http://localhost:${process.env.API_PORT}`);
});