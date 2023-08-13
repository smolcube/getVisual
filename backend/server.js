const express = require('express');
const dotenv = require('dotenv')
dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

app.use('/getvisual', require('./routes/mainRoutes'));

app.listen(port, () => {
    console.log(`Server runs on port ${port}`);
});
