// load .env file
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const router = require('./route/router');

const app = express();

// TODO: edit cors so it only allow our frontend in prod
app.use(cors());

const port = process.env.PORT || 3000;

app.use(router);

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
