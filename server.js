const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",'Content-Type');
    res.header("Access-Control-Allow-Methods", ['GET', 'PUT', 'POST']);
    next();
});

app.use(require('./routes/index'));
app.use(require('./routes/experiment'));
app.use(require('./routes/paticipant'));

app.listen(3000, () => console.log('listening on port 3000'));