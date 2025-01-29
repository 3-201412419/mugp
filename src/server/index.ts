import express from 'express';
import cors from 'cors';
import path from 'path';
import sequelize, { initDatabase } from './config/db';
import applyRoutes from './routes/apply';
import artistRoutes from './routes/artists';
import dotenv from 'dotenv';

// Import models to ensure they are registered with Sequelize
import Artist from './models/Artist';
import Apply from './models/Apply';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5000', 'https://3-201412419.github.io'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Initialize database and start server
initDatabase()
  .then(() => {
    console.log('Models registered:', Object.keys(sequelize.models));
    
    // Routes
    app.use('/api/apply', applyRoutes);
    app.use('/api/artists', artistRoutes);

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
