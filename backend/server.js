const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const colors = require("colors")
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

const port = process.env.PORT || 5000;

connectDB()
app.use(cookieParser()); // Use cookie-pasrser to access cookies
app.use(errorHandler);
app.use(express.json()); // Use built-in JSON parsing middleware
app.use(express.urlencoded({ extended: true })); // Use built-in URL-encoded parsing middleware

app.use('/getvisual', require('./routes/mainRoutes'));
app.use('/getvisual/dashboard', require('./routes/adminRoutes'));

app.listen(port, () => {
    console.log(`Server runs on port ${port}`);
});
