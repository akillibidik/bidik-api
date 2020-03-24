
require('./config/config');
require("./db/mongoose");

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

const API_PORT = process.env.PORT || 3001;
const app = express();
const router = express.Router(); 
const cors = require('cors');

var { Question } = require('./models/question');
var { User } = require('./models/user');

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

//Get users with query
router.get('/users', cors(), (req, res) => {
    var query = {$and: [{}]};

    if(req.query.id)
        query.$and.push({'id': req.query.id});
    if(req.query.username)
        query.$and.push({'username': req.query.username});
    if(req.query.surname)
        query.$and.push({'surname': req.query.surname});
    if(req.query.role)
        query.$and.push({'role': req.query.role});
    if(req.query.grade)
        query.$and.push({'grade': req.query.grade});
    if(req.query.email)
        query.$and.push({'email': req.query.email});
    if(req.query.language)
        query.$and.push({'language': req.query.language});

    User.find(query).then((users) => {
        res.send({ users });
    }, (err) => {
        res.status(400).send(err);
    });
});

//Add a user
router.post('/users', cors(), (req, res) => {
    var user = new User({
        id: req.body.id,
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        role: req.body.role,
        grade: req.body.grade,
        email: req.body.email,
        language: req.body.language
    });

    user.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});


//Get questions with query
router.get('/questions', cors(), (req, res) => {

    var query = {$and: [{}]};

    if(req.query.id)
        query.$and.push({'id': req.query.id});
    if(req.query.title)
        query.$and.push({'title': req.query.title});
    if(req.query.correctAnswer)
        query.$and.push({'correctAnswer': req.query.correctAnswer});

    Question.find(query
    ).then((question) => {
        if (!question) {
            return res.status(404).send();
        }
        res.send({ question });
    }).catch((e) => {
        res.status(400).send();
    });

});

//Add a question
router.post('/questions', cors(), (req, res) => {
    var question = new Question({
        id: req.body.id,
        title: req.body.title,
        question: req.body.question,
        optiona: req.body.optiona,
        optionb: req.body.optionb,
        optionc: req.body.optionc,
        optiond: req.body.optiond,
        correctAnswer: req.body.correctAnswer
    });

    question.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

// append /api for our http requests 
app.use("/api", router);

// launch backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));