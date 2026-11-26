import { MongoClient } from "mongodb";

const DATABASE_NAME = "expense_tracker";

let database;

/**
 * Connect to MongoDB and store the selected database for later use.
 */
export async function connectToDatabase() {
  const connectionString = process.env.MONGODB_URI;

  if (!connectionString) {
    throw new Error("MONGODB_URI is not set in the environment.");
  }

  const client = new MongoClient(connectionString);

  try {
    await client.connect();
    database = client.db(DATABASE_NAME);

    await database.command({ ping: 1 });
    console.log(`Connected to MongoDB database: ${DATABASE_NAME}`);

    return database;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
}

/**
 * Return the connected database for queries used by other backend modules.
 */
export function getDatabase() {
  if (!database) {
    throw new Error("Database is not connected. Call connectToDatabase() first.");
  }

  return database;
}
