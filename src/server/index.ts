import express from 'express';
import cors from 'cors';
import path from 'path';
import { connectDB } from './config/db';
import applyRoutes from './routes/apply';
import artistRoutes from './routes/artists';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Routes
app.use('/api/apply', applyRoutes);
app.use('/api/artists', artistRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
