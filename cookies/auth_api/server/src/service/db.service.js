import mongoose from "mongoose";

// Variable for a connection-singleton
let connection;

// Service function for connecting to the database and providing a connection singleton
// (singleton -> Just one connection instance)
export async function getDbConnection() {
    // Check if connection singleton is still empty
    if (connection === undefined) {
        try {
            // Set 'strict' mode for mongoose (Fields that aren't specified in the schema, won't be saved)
            mongoose.set('strictQuery', true);

            // Try to establish connection to DB
            connection = await mongoose.createConnection(config.dbUri + config.dbName, {
                maxPoolSize: 10
            }).asPromise();

            console.log('Connection to DB successful');

        } catch (error) {
            console.error(error);
        }
    }

    // Return connection instance
    return connection;
}


/* 
    The connection can also be established once via mongoose.connect alternatively,
    so that it acts as a 'default' connection in mongoose.
    In that case only one database can be connected at once, saves some complexity though.
*/
/* 
    This function would be called only once in the index.js and from then on mongoose
    will use this default connection automatically on every DB call.
*/
export async function connectToDb() {
    try {
        // Set 'strict' mode for mongoose (Fields that aren't specified in the schema, won't be saved)
        mongoose.set('strictQuery', true);

        // Perform the mongoose connection on the credentials from the .env file
        await mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
            maxPoolSize: 10
        });

        console.log('Connection to DB established');

    } catch (error) {
        console.error(error);
    }
}