const express = require('express');
var helmet = require('helmet');
var path = require('path');
var bodyParser = require('body-parser');
var expressSanitizer = require('express-sanitizer');

const app = express();

app.use(helmet());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSanitizer());

app.use(express.static('public'));

var message = process.env.message || "hello world";

app.get('/', (req, res) => 
{   
    res.render('index', {message: message});
});

app.post('/message_received', (req, res) => {  //send a message to a stranger :)
    message = req.sanitize(req.body.message);
    process.env.message = message;
    res.sendFile('message_received.html', {root: 'views'});
});

app.listen(process.env.PORT || 3000, () => console.log('app listening on port 3000!'));