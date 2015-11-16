var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    db.collection('parent').find({}).toArray(function (err, items) {
        res.json(items);
    });
});

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



module.exports = router;
