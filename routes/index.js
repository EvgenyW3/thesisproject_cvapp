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
		    console.log(page.education);
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
router.get('/delete/school/:id', function (req, res) {
    Page.findOne(function (err, page) {
        console.log("This is output"+page.education.id);
        if(err) throw err;
        var job = page.education.id(req.params.id).remove();
        page.save(function (error) {
            if(error) throw error;
                res.redirect('/');
            });
    });
});


module.exports = router;
