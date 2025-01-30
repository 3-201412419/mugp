import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './server/config/db';
import artistsRouter from './server/routes/artists';
import applyRouter from './server/routes/apply';
import calendarRouter from './server/routes/calendar';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

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

// Routes
console.log('Setting up routes...');
app.use('/api/artists', artistsRouter);
app.use('/api/apply', applyRouter);
app.use('/api/calendar', calendarRouter);
console.log('Routes set up successfully');

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// Initialize database connection
initDatabase()
  .then(() => {
    // Start server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
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
