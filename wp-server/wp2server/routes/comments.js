var express = require("express");
var router = express.Router();
var db = require('../service/request.service.js');

router.use(function (req, res, next) {
res.set('Content-Type', 'application/json');
next();
});

/* GET comments. */
router.route('/')

.get(function(req, res) {
db.getAllComments(function(comments, err) {
    if (err) res.status(500).send(JSON.stringify(err.message));
    else res.send(JSON.stringify(comments));
})
})
.post(function (req, res) {
db.createComment(req, function (results) {
    res.status(201)
    res.json(results)
        .end();
});
});
router.route('/:id')
.get(function (req, res) {
db.getSingleComment(req.params.id, function (results) {
    res.json(results)
});
})
.delete(function(req, res) {
db.removeComment(req, res, function(){

})
})
.put(function (req, res) {
db.updateComment(req, res, function () {
    res.status(200)
        .end();
})
});

module.exports = router;