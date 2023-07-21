import mongoose from "mongoose";

// Define User schema
const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    city: { type: String }
}, {timestamps: true});


/* 
    Create a new model instance for User.
    Automatically creates a 'users' collection in the MongoDB if not yet present
*/
const User = mongoose.model('User', userSchema);

// DB-function for querying a single user entry by its username
export async function findUserByUsername(username) {
    return await User.findOne({username: username});
}

// DB-function for creation of a new user entry
export async function insertNewUser(userBody) {
    try {
        // Create new instance of user model
        const newUser = new User(userBody);

        // Save the new instance
        return await newUser.save();

    } catch (error) {
        // Check if Conflict due to duplicate
        if ( (error.hasOwnProperty('code')) && (error.code === 11000) ) {
            // Throw corresponding error object
            throw {
                code: 409,
                message: error.message
            };

        } else {
            // Appears to be a validation problem.
            // Throw corresponding error object
            throw {
                code: 400,
                message: error.message
            };
        }
    }
}