const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

// Configure CORS to allow requests from the frontend
app.use(cors({
  origin: ['http://192.168.56.1:5173', 'http://192.168.56.1:4173', 'http://192.168.56.1:3000'], // Added port 3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));