import 'dotenv/config';

import app from './app.js';
import connectDatabase from './config/db.js';
import validateEnvironment from './config/env.js';

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    validateEnvironment();
    await connectDatabase();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
