var express = require('express');
var router = express.Router();
var passport = require('passport');
var Page = require('../models/page.js');
var mongoose = require('mongoose');
//Module for uploading images
var multer = require('multer');
//This is for preventing multer from giving name without extention
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/files/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
});

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
			res.render('index', { title: page.author, page: page, size: size, helpers:{
                reverse: function (arr) {
                    arr.reverse();
                }
            }, isLoggedIn: null});
		}
	});
});
// admin view
router.get('/admin', isLoggedIn, function(req, res) {
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
            res.render('index', { title: page.author, page: page, size: size, helpers:{
                reverse: function (arr) {
                    arr.reverse();
                }
            }, isLoggedIn: 'yep'});
        }
    });
});

var myUpload = upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'cv', maxCount: 1 }])
router.post('/update', myUpload, function(req, res) {
    if(req.files.photo) req.body.photo = req.files.photo[0].filename;
    if(req.files.cv) req.body.cv = req.files.cv[0].filename;
    Page.update({_id: req.body.id}, req.body, function (err) {
        if (err) throw err;
        res.redirect('/admin');
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

router.get('/delete', function (req, res) {
    Page.collection.drop();
    var page = new Page();
    page.save(function (err) {
        if(err) throw err;
        res.redirect('/');
    });
});
// render login form
router.get('/login', function (req, res) {
    res.render('login',{ message: 'Welcome admin! Log in to add/modify info', layout: null});
});

// process the login form
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/admin', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
