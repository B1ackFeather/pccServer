var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    db.collection('activity').find({}).toArray(function (err, items) {
        res.json(items);
    });
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
