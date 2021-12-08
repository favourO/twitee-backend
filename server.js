const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');


// Load express
const app = express();

//`Load cors
app.use(cors());

// Body Parser
app.use(express.json({ extended: true}));
app.use(express.urlencoded({ extended: true}));

// load environment variables using dotenv
dotenv.config({ path: './config/config.env'});

// Connect to Database
connectDB();


// Load Route files
const authRoutes = require('./routes/userRoutes');
const twitRoutes = require('./routes/twitRoutes');
const commentRoutes = require('./routes/commentRoutes');


// Middleware logging during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount Route files
app.use('/api/twitee/auth', authRoutes);
app.use('/api/twitee/twits', twitRoutes);
app.use('/api/twitee/comments', commentRoutes);

// Use error handler
app.use(errorHandler);


// PORT
const PORT = 4000 || process.env.PORT;

const server = app.listen(PORT, () => {
    console.log(`Server Listening in PORT ${PORT} on ${process.env.NODE_ENV}`.grey.italic)
});


// Handle unhandled rejections like database connection processes
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error - ${err.message}`.red.bold);
    // Close the server and exit process
    server.close(() => process.exit(1));
})