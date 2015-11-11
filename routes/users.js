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
	    db.collection('parent').findOne({'parentID':req.query.ID, 'password':req.query.password}, function (err, items) {
	        if (items == null){
	        	res.json({'sta':false});
	        }
	        else{
	        	items.sta = true;
	        	res.json(items);
	        }
	    });   	
    }
    else{
    db.collection('teacher').findOne({'teacherID':req.query.ID, 'password':req.query.password}, function (err, items) {
        if (items == null){
        	res.json({'sta':false});
        }
        else{
        	items.sta = true;
        	res.json(items);
        }
    });
    }

});



module.exports = router;
