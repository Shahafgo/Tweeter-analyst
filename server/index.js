const express = require('express');
const analyst = require('./analyst.js');
const cors = require('cors')
const app = express();
const port = 4000;
const WELCOME_SENTENCE ="Welcome to your tweeter analyst server side !";

app.use(cors({
      origin: ['http://localhost:3000',],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));

app.get('/', (req, res) => res.send(WELCOME_SENTENCE));
app.route('/getAvgTweetsPerSecond').get((req, res) => res.send(analyst.getAvgTweetsPerSecond()));
app.route('/getTopFrequentWords').get((req, res) => res.send(analyst.getWords()));
app.route('/getTopFrequentNames').get((req, res) => res.send(analyst.getNames()));
app.route('/getTopFrequentHashtags').get((req, res) => res.send(analyst.getHasTags()));

// Activate analyst
analyst.start();

app.listen(port,console.log(`Tweeter analyst server listening on port ${port}!`))
