var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
fs = require('fs');

var app = express();
var PORT = 4000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileUpload());

app.get('/', function (req, res) {
    res.send("Hello from server")
});

app.post('/signup', function (req, res) {
    console.log(req.body)
    res.send({ qStatus: "successful", body: req.body, params: req.params });
});

app.post('/uploadfile', function (req, res) {
    console.log(req.files.file)
    res.send({ qStatus: "successful" });
    fs.writeFile(`./public/${req.files.file.name}`, req.files.file.data, function (err) {
        if (err) return console.log(err);
        console.log('Hello World > helloworld.txt');
    });
});

app.post('/signin', function (req, res) {
    console.log(req.body)
    let s = parseInt(Math.random() * 100000000);
    res.send({ qStatus: "successful", token: 'token-' + s });
});


app.listen(PORT, () => {
    console.log(`server is listen on port http://localhost:${PORT}`)
});
