const express = require('express');
const dotenv = require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

app.use('/getvisual/main', require('./routes/mainRoute'));

app.listen(port, () => {
    console.log(`Server runs on port ${port}`);
});
