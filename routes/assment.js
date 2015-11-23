var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    db.collection('assignment').find({}).toArray(function (err, items) {
        res.json(items);
    });
});

router.get('/get', function(req, res, next) {
    var db = req.db;
    if(req.query.classnum)
        db.collection('assignment').find({'classid':req.query.classnum}).toArray(function (err, items){
           res.json(items);
        }); 	
    else if(req.query.teacher)
        db.collection('assignment').find({'teacherid':req.query.teacher}).toArray(function (err, items){
           res.json(items);
        }); 
});

// POST add a new assignment
router.post('/', function(req, res) {
    var db = req.db;
    db.collection('assignment').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { status: true } : { status: false }
        );
   });
});

module.exports = router;
