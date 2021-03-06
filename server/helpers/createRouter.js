const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection.find().toArray()
    .then((docs) => res.json(docs))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  });

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection.findOne({ _id: ObjectID(id) })
    .then((doc) => res.json(doc))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  });

  router.post('/', (req, res) => {
    const newItem = req.body;
    collection.insertOne(newItem)
    .then(result => res.json(result.ops[0]))
    .catch((error) => {
      console.error(error);
      res.status(500);
      res.json({status:500, error: error});
    })
  });

  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedItem = req.body;
    collection.findOneAndUpdate(
      {_id: ObjectID(id)},
      {$set: updatedItem},
      {returnOriginal: false}
    ).then(result => res.json(result.value))
    .catch((error) => {
      console.error(error);
      res.status(500);
      res.json({status:500, error: error});
    });
  });

  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection.deleteOne({ _id: ObjectID(id) })
    .then(result => {
      res.json(result)
    }).catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  });

  router.delete('/', (req, res) => {
    collection.remove({})
    .then(result => {
      res.json(result)
    }).catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  });
  return router;
};

module.exports = createRouter;
