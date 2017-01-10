var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var about = new Schema({
	coverLetter: {type: String},
	phoneNumber: {type: String},
	email: {type: String},
	address: {type: String},
});

var school = new Schema({
	schoolName: {type: String},
	programmeName: {type: String},
	date: {type: String},
	explanation: {type: String}
});

var job = new Schema({
	employerName: {type: String,},
	position: {type: String},
	date: {type: String},
	explanation: {type: String}
});

var page = new Schema({
	author: {type: String},
	profession: {type: String},
	photo: {type: String},
	cv: {type: String},
	facebook: {type: String},
	linkedIn: {type: String},
	github: {type: String},
	aboutSubtitle: {type: String},
	about: about,
	skillsSubtitle: {type: String},
	skills: [{title: {type: String}, skills:[{skillName: {type: String}, mastery: {type: String}}]}],
	expirienceSubtitle: {type: String},
	expirience: [job],
	educationSubtitle: {type: String},
	education: [school]
});

module.exports = mongoose.model('Page', page);