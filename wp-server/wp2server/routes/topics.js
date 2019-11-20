var express = require("express");
var router = express.Router();

/* import { deleteTopicWithId } from '../service/request.service.js'; */
var db = require('../service/request.service.js');
//Set JSON as the content-type
router.use(function (req, res, next) {
  res.set('Content-Type', 'application/json');
  next();
});

/* GET topics. */
router.route('/')

.get(function(req, res, next) {
  db.getAllTopics(function(topics, err) {
    if (err) res.status(500).send(JSON.stringify(err.message));
    else res.send(JSON.stringify(topics));
  })
})
.post(function (req, res) {
  db.createTopic(req, function (results) {
      res.status(201)
      res.json(results)
          .end();
  });
});
router.route('/:id')
.get(function (req, res) {
  db.getSingleTopic(req, function (results) {
      res.json(results)
  });
})
.delete(function(req, res) {
  db.removeTopic(req, res, function(){

  })
})
.put(function (req, res) {
  db.updateTopic(req, res, function () {
      res.status(200)
          .end();
  })
});

module.exports = router;
