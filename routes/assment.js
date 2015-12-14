var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    db.collection('assignment').find({}).toArray(function (err, items) {
        res.json(items);
    });
});

//GET one assignment by classid or teacherid
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

//GET one assignment by id
router.get('/getone', function(req, res, next) {
    var db = req.db;
    db.collection('assignment').findOne({'assignid':req.query.ID}, function (err, items) {
       res.json(items);
    });     
});

// POST add a new assignment
router.post('/', function(req, res) {
    var db = req.db;
    var assignment;
    var classid;
    db.collection('assignment').findOne({'assignid':req.body.assignid}, function (err, items) {
        assignment = items;
    }); 
    if(assignment != null)
         res.json({status: false});
    else{
        db.collection('assignment').insert(req.body, function(err, result){
            classid = req.body.classid;
        });
        db.collection('parent').findOne({'childid':req.query.ID, 'password':req.query.password}, function (err, items) {
            res.json(items);
        });      
    }
    
});

module.exports = router;
