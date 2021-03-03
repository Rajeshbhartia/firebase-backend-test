var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
fs = require('fs');
const { exec } = require("child_process");

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

app.get('/getdirectory', function (req, res) {
    console.log(req.body)
    exec("ls", (error, stdout, stderr) => {
        var directories = null;
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        directories = stdout.split(/\r?\n/)
        console.log(`stdout: ${stdout}`);
        console.log(typeof stdout);

        res.send({ qStatus: "successful", directories });
    });
});

app.post('/customCommand', function (req, res) {
    console.log(req.body)

    exec(req.body.command, (error, stdout, stderr) => {
        var directories = null;
        if (error) {
            console.log(`error: ${error.message}`);
            res.send({ qStatus: "unSuccessful", error: error.message });
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.send({ qStatus: "unSuccessful", error: error.message });
            return;
        }

        directories = stdout
        console.log(`stdout: ${stdout}`);
        res.send({ qStatus: "successful", resp: stdout });
    });
    // let s = parseInt(Math.random() * 100000000);
    // res.send({ qStatus: "successful", token: 'token-' + s });
});

app.post('/signin', function (req, res) {
    console.log(req.body)
    let s = parseInt(Math.random() * 100000000);
    res.send({ qStatus: "successful", token: 'token-' + s });
});


app.listen(PORT, () => {
    console.log(`server is listen on port http://localhost:${PORT}`)
});
