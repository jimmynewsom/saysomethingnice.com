const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

var message = "hello world";

app.get('/', (req, res) => 
{   
    res.render('index', {message: message});
});

app.post('/message_received', (req, res) => {  //send a message to a stranger :)
    message = req.body.message;
    res.sendFile('message_received.html', {root: 'views'});
});

app.listen(3000, () => console.log('app listening on port 3000!'));