const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/createRouter.js');
const cors = require('cors');
const parser = require('body-parser');

app.use(parser.json());
app.use(cors());

MongoClient.connect('mongodb://localhost:27017')
.then((client) => {
  const db = client.db('calorie_tracker');

  const personCollection = db.collection('person');
  const personRouter = createRouter(personCollection);
  app.use('/api/tracker/person', personRouter);

  const mealCollection = db.collection('meals');
  const mealsRouter = createRouter(mealCollection);
  app.use('/api/calorieTracker', mealsRouter);

}).catch(console.error);

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
