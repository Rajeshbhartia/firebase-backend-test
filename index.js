var express = require('express');
var app = express();
var PORT = 4000;

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`server is listen on port ${PORT}`)
});