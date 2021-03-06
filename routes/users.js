var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    if (req.query.isparent == 1){
        db.collection('parent').find({}).toArray(function (err, items) {
            res.json(items);
        });
    }
    else{
        db.collection('teacher').find({}).toArray(function (err, items) {
            res.json(items);
        });
    }
});

// GET check login
router.get('/login', function(req, res, next) {
    var db = req.db;
    if (req.query.isparent == 1){
	    db.collection('parent').findOne({'childid':req.query.ID, 'password':req.query.password}, function (err, items) {
	        res.json(items);
	    });   	
    }
    else{
	    db.collection('teacher').findOne({'teacherid':req.query.ID, 'password':req.query.password}, function (err, items) {
	        res.json(items);
	    });
    }

});

// POST to add a user
router.post('/', function(req, res) {
    var db = req.db;
    if (req.query.isparent == 1){
        db.collection('parent').insert(req.body, function(err, result){
            res.send(
                (err === null) ? { status: true } : { status: false }
            );
        });
    }
    else{
        db.collection('teacher').insert(req.body, function(err, result){
            res.send(
                (err === null) ? { status: true } : { status: false }
            );
        });
    }
});


module.exports = router;
