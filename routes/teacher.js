var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    db.collection('teacher').find({}).toArray(function (err, items) {
        res.json(items);
    });
});

// GET check login
router.get('/login', function(req, res, next) {
    var db = req.db;
    db.collection('teacher').findOne({'teacherid':req.query.ID, 'password':req.query.password}, function (err, items) {
	    res.json(items);
    });
});

// GET teacher name by classid
router.get('/getname', function(req, res, next) {
    var db = req.db;
    db.collection('teacher').find({'classid':req.query.classid},{'_id':0, 'teacherid':1, 'teachername':1}).toArray(function (err, items) {
        res.json(items);
    });     

});

// POST to add a user
router.post('/', function(req, res) {
    var db = req.db;
    db.collection('teacher').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { status: true } : { msg:'error: ' + err }
        );
    });
});


module.exports = router;
