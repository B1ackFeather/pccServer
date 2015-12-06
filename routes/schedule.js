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

// router.get('/get', function(req, res, next) {
//     var db = req.db;
//     if(req.query.classnum)
//         db.collection('assignment').find({'class':req.query.classnum}).toArray(function (err, items){
//            res.json(items);
//         }); 	
//     else if(req.query.teacher)
//         db.collection('assignment').find({'teacherid':req.query.teacher}).toArray(function (err, items){
//            res.json(items);
//         }); 
// });



module.exports = router;
