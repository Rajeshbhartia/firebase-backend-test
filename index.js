var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser')

var app = express();
var PORT = 4000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.send({ qStatus: "successful" })
});

app.post('/signup', function (req, res) {
    console.log(req.body)
    res.send({ qStatus: "successful", body: req.body, params: req.params });
});

app.post('/signin', function (req, res) {
    console.log(req.body)
    let s = parseInt(Math.random() * 100000000);
    res.send({ qStatus: "successful", token: 'token-' + s });
});


app.listen(PORT, () => {
    console.log(`server is listen on port http://localhost:${PORT}`)
});
