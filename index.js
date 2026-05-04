const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true })); // Adjust origin according to frontend URL when deploying

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/crypto', require('./routes/cryptoRoutes'));

// For mapping exact route matches specified in instructions
// The instructions mentioned /register and /login directly, some might consume it that way instead of /auth/login
const authController = require('./controllers/authController');
const authMiddleware = require('./middleware/auth');
app.post('/register', authController.register);
app.post('/login', authController.login);
app.get('/profile', authMiddleware, authController.profile);

// Simple root endpoint
app.get('/', (req, res) => {
  res.send('Coinbase API Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));