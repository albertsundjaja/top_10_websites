// load .env file
require('dotenv').config()
const express = require('express');
const router = require('./route/router');

const app = express();
const port = process.env.PORT || 3000;

app.use(router);

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
