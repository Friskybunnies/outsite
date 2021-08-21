const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const data = require('./data.js');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log(data);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(data);
});

const port = 5000;

app.listen(port, () => console.log(`Server listening on port ${port}!`));