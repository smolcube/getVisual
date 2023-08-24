const express = require('express');
const dotenv = require('dotenv')
dotenv.config();
const colors = require("colors")
const connectDB = require('./config/db');
const app = express();

const port = process.env.PORT || 5000;
connectDB()
app.use('/getvisual', require('./routes/mainRoutes'));

app.listen(port, () => {
    console.log(`Server runs on port ${port}`);
});
