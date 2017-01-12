var express = require('express');
var router = express.Router();
var Page = require('../models/page.js');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res) {
	Page.findOne(function(err, page){
		if(err) throw err;
		if(!page){
            res.render('index', { title: "Empty database!", error: "Database is empty! Refresh this page or rerun your server." });
            var page = new Page();
            page.save();
		}else{
			var list = page.skills;
			var size = 0;
            for(var i = 0; i < list.length; i++){
				size += list[i].skills.length;
            }
			res.render('index', { title: page.author, page: page, size: size });
		}
	});
});

router.post('/update', function(req, res) {
    Page.update({_id: req.body.id}, req.body, function (err) {
        if (err) throw err;
        res.redirect('/');
    });
});
router.delete('/delete/school/:id', function (req, res) {
    if(req.params.id !== "undefined") {
        Page.findOne(function (err, page) {
            if (err) throw err;
            var school = page.education.id(req.params.id).remove();
            page.save(function (error) {
                if (error) throw error;
            });
        });
    }else{
        res.send("Item does not exist in database, deleted from view only");
    }
});
router.delete('/delete/job/:id', function (req, res) {
    if(req.params.id !== "undefined") {
        Page.findOne(function (err, page) {
            if (err) throw err;
            var job = page.expirience.id(req.params.id).remove();
            page.save(function (error) {
                if (error) throw error;
            });
        });
    }else{
        res.send("Item does not exist in database, deleted from view only");
    }
});
router.delete('/delete/group/:id', function (req, res) {
    if(req.params.id !== "undefined") {
        Page.findOne(function (err, page) {
            if (err) throw err;
            var group = page.skills.id(req.params.id).remove();
            page.save(function (error) {
                if (error) throw error;
            });
        });
    }else{
        res.send("Item does not exist in database, deleted from view only");
    }
});


module.exports = router;
