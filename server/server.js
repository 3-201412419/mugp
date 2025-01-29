const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const sequelize = require('./config/database');
const artistsRouter = require('./routes/artists');
const calendarRoutes = require('./routes/calendarRoutes');

// Load environment variables from root .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection and sync
async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log('MySQL connection has been established successfully.');
    
    // Sync all models with database
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

initDatabase();

// Routes
app.use('/api/artists', artistsRouter);
app.use('/api/calendar', calendarRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
