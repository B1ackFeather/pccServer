var express = require('express');
var router = express.Router();

/* GET activity listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    db.collection('activity').find({}).toArray(function (err, items) {
        res.json(items);
    });
});

// GET one activity
router.get('/get', function(req, res, next) {
    var db = req.db;
    db.collection('activity').findOne({'activityid':req.query.activityid}, function (err, items) {
       res.json(items);
    });     
});

//join an activity
router.get('/join', function(req, res, next) {
    var db = req.db;
    db.collection('activity').findOne({'activityid':req.query.activityid, 'participateid':req.query.ID}, function (err, items) {
        if(items != null)
            res.send({ status: false });
        else{
            db.collection('activity').update({'activityid':req.query.activityid}, {$push:{'participateid':req.query.ID}}, function(err, result) {
                res.send(
                    (err === null) ? { status: true } : { msg:'error: ' + err }
                );
            });     
        }
    });         
});

//quit an activity
router.get('/quit', function(req, res, next) {
    var db = req.db;
    db.collection('activity').findOne({'activityid':req.query.activityid, 'participateid':req.query.ID}, function (err, items) {
        if(items == null)
            res.send({ status: false });
        else{
            db.collection('activity').update({'activityid':req.query.activityid}, {$pull:{'participateid':req.query.ID}}, function(err, result) {
                res.send(
                    (err === null) ? { status: true } : { msg:'error: ' + err }
                );
            });     
        }
    });             
});

/*
 * DELETE to delete POI.
 */
router.delete('/del', function(req, res) {
    var db = req.db;
    db.collection('activity').remove({'activityid':req.query.activityid}, function(err, result) {
        res.send((result.result.n == 1) ? { status: true } : { msg:'error: ' + err });
    });
});

// POST add a new activity
router.post('/', function(req, res) {
    var db = req.db;
    db.collection('activity').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { status: true } : { msg:'error: ' + err }
        );
   });
});

module.exports = router;
