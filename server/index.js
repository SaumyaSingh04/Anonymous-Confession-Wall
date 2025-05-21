require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

connectDB();
const app = express();

// Middlewares
app.use(helmet());
app.use(cors({ origin: 'https://anonymous-confession-wall.vercel.app' }));
app.use(express.json());
app.use(morgan('tiny'));

const limiter = rateLimit({
  windowMs: 15*60*1000,
  max: 100
});
app.use(limiter);

// Routes
app.use('/api/confessions', require('./routes/confessionRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
