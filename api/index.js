import app from '../backend/src/app.js';
import connectDatabase from '../backend/src/config/db.js';
import validateEnvironment from '../backend/src/config/env.js';

let databaseConnectionPromise;

const handler = async (req, res) => {
  try {
    validateEnvironment();

    if (!databaseConnectionPromise) {
      databaseConnectionPromise = connectDatabase().catch((error) => {
        databaseConnectionPromise = undefined;
        throw error;
      });
    }

    await databaseConnectionPromise;
    return app(req, res);
  } catch (error) {
    console.error(`Failed to initialize API: ${error.message}`);
    return res.status(500).json({ message: 'API initialization failed' });
  }
};

export default handler;
