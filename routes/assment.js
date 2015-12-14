var express = require('express');
var router = express.Router();

/* GET assignments listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    db.collection('assignment').find({}).toArray(function (err, items) {
        res.json(items);
    });
});

//GET one assignment by classid or teacherid
router.get('/get', function(req, res, next) {
    var db = req.db;
    if(req.query.classid)
        db.collection('assignment').find({'classid':req.query.classid}).toArray(function (err, items){
           res.json(items);
        }); 	
    else if(req.query.teacherid)
        db.collection('assignment').find({'teacherid':req.query.teacherid}).toArray(function (err, items){
           res.json(items);
        }); 
});

//GET one assignment by id for parent
router.get('/getone', function(req, res, next) {
    var db = req.db;
    db.collection('assignment').findOne({'assignid':req.query.assignid}, function (err, items) {
       res.json(items);
    });     
});

//GET one assignment for teacher
router.get('/get1', function(req, res, next) {
    var db = req.db;
    db.collection('ass_parent').find({'assignid':req.query.assignid}, {'_id':0, 'assignid':0}).toArray(function (err, items) {
       res.json(items);
    });     
});

//Submit assignment
router.post('/submit', function(req, res, next) {
    var db = req.db;
    db.collection('ass_parent').findOne({'assignid':req.query.assignid, 'childname':req.query.childname}, function (err, items) {
        if(items == null)
            res.send({ status: false });
        else{
            res.send({ status: true });
        }
    });    
});

//Submit assignment
router.get('/submit', function(req, res, next) {
    var db = req.db;
    db.collection('ass_parent').findOne({'assignid':req.query.assignid, 'childname':req.query.childname}, function (err, items) {
        if(items == null)
            res.send({ status: false });
        else{
            db.collection('ass_parent').update({'assignid':req.query.assignid, 'childname':req.query.childname}, {$set:{"hasfinished":true}}, function (err, items) {
                res.send(
                  (err === null) ? { status: true } : { msg:'error: ' + err }
                );
            }); 
        }
    });    
});

// POST add a new assignment
router.post('/', function(req, res) {
    var db = req.db;
    var assignment;
    var assignid;
    var classid;
    var childs;
    db.collection('assignment').findOne({'assignid':req.body.assignid}, function (err, items) {
        assignment = items;
    }); 
    if(assignment != null)
         res.json({status: false});
    else{
        db.collection('assignment').insert(req.body, function(err, result){
            classid = req.body.classid;
            assignid = req.body.assignid;
            db.collection('parent').find({'classid':classid}, {'_id':0, 'childname':1}).toArray(function (err, items) {
                childs = items;
                for(var i = 0; i < childs.length; i++){
                    childs[i].hasfinished = false;
                    childs[i].assignid = assignid;
                    console.log(childs);
                }
                db.collection('ass_parent').insert(childs, function(err, result){
                    res.json(childs);
                });
            });
        });   
    }
    
});

// test
router.get('/test', function(req, res) {
    var db = req.db;
    var len;
    var childs;
    var assignid = 'as102';
    db.collection('parent').find({'classid':req.query.classid}, {'_id':0, 'childname':1}).toArray(function (err, childs) {
        for(var i = 0; i < childs.length; i++){
            childs[i].hasfinished = false;
            childs[i].assignid = assignid;
            console.log(childs);
        }
        db.collection('ass_parent').insert(childs, function(err, result){
            res.json(childs);
        });
    }); 
});

module.exports = router;
