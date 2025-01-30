import express from 'express';
import cors from 'cors';
import path from 'path';
import sequelize, { initDatabase } from './config/db';
import applyRoutes from './routes/apply';
import artistRoutes from './routes/artists';
import calendarRoutes from './routes/calendar';
import dotenv from 'dotenv';

// Import models to ensure they are registered with Sequelize
import Artist from './models/Artist';
import Apply from './models/Apply';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5000', 'https://3-201412419.github.io'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Routes
app.use('/api/artists', artistRoutes);
app.use('/api/apply', applyRoutes);
app.use('/api/calendar', calendarRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// Initialize database and start server
initDatabase()
  .then(() => {
    console.log('Models registered:', Object.keys(sequelize.models));
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log('Available routes:');
      console.log('- /api/artists');
      console.log('- /api/apply');
      console.log('- /api/calendar');
      console.log('- /api/test');
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
