var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  	Page.findOne(function(err, page){
		if(err) throw err;
		if(!page){
			res.render('index', {button: 'Create resume'});
		}else{
			res.render('index', { title: page.author, button: 'Update resume', page: page });
		}
	});
});

module.exports = router;
