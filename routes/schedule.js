var express = require('express');
var router = express.Router();

/* GET schedule listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    db.collection('schedule').find({}).toArray(function (err, items) {
        res.json(items);
    });
});

/* GET shedule by id listing. */
router.get('/get', function(req, res, next) {
    var db = req.db;
    if(req.query.classid)
	    db.collection('schedule').find({'classid':req.query.classid},{'_id':0}).toArray(function (err, items) {
	   		res.json(items);
	    });    
    else if(req.query.teacherid)
    	db.collection('schedule').find({'teacherid':req.query.teacherid},{'_id':0}).toArray(function (err, items) {
	   		res.json(items);
	    }); 
   	else{
		var err = new Error('Not Found');
  		err.status = 404;
  		next(err);
 	}
		
  });

module.exports = router;
