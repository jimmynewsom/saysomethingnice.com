const express = require('express');
var helmet = require('helmet');
var path = require('path');
var bodyParser = require('body-parser');
var expressSanitizer = require('express-sanitizer');

//there's better ways to do this than MongoDB. lots of dead weight.
// but I can do this on Heroku for free, so fuck it
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express();

app.use(helmet());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSanitizer());

app.use(express.static('public'));

MongoClient.connect(process.env.MONGODB_URI, function(err, db) {

    var message;

    app.get('/', (req, res) => 
    {   
        message = await db.collection('storage').findOne({}, {message:1});
        res.render('index', {message: message.message});
    });

    app.post('/message_received', (req, res) => {  //send a message to a stranger :)
        message = req.sanitize(req.body.message);
        await db.collection('storage').findOneAndUpdate({}, {message: message});
        res.sendFile('message_received.html', {root: 'views'});
    });

    app.listen(process.env.PORT || 3000, () => console.log('app listening on port 3000!'));

});