
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

//Get all users
router.get('/users', cors(), (req, res) => {
    User.find({}).then((users) => {
        res.send({ users });
    }, (err) => {
        res.status(400).send(err);
    });
});

//Add a user
router.post('/users', cors(), (req, res) => {

    /* EXTRA VALIDATIONS
    const { id, message } = req.body;

    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }

    */

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

//Get all questions
router.get('/questions', cors(), (req, res) => {
    Question.find({}).then((questions) => {
        res.send({ questions });
    }, (err) => {
        res.status(400).send(err);
    });
});

//Get a question with ID
router.get('/questions/:id', cors(), (req, res) => {
    var id = req.params.id;
    Question.findOne({
        id: id
    }).then((question) => {
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

    /* EXTRA VALIDATIONS
    const { id, message } = req.body;

    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }

    */

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