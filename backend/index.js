const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', (req, res) => {
    return res.json({ 'msg': "this is the home page."});
});

app.listen(process.env.PORT, async () => {
    console.log(`Server Started at port: ${process.env.PORT}`);
});