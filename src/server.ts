import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './server/config/db';
import artistsRouter from './routes/artistRoutes';
import applyRouter from './server/routes/apply';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database connection
initDatabase()
  .then(() => {
    // Routes
    app.use('/api/artists', artistsRouter);
    app.use('/api/apply', applyRouter);

    // Start server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
