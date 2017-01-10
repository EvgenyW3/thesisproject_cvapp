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

/*
Dummy data

 EXPERIENCE
 What I have done

 02.2017 -
 W3 Group Finland / Web Developer

 Internship at W3. Started as an UI tester I got a great desire to move forward and start coding big project as soon as possible. Keywords: Web development, NodeJS, AngularJS, VueJS, MongoDB, PHP, WordPress

 02.2014 - 08.2014
 HUS-Tietohallinto / Software Tester

 Started as an intern, later on became a part of software testing team and continued as summer employee. There was a huge migration from old versions of Windows to a new on and all the software tests were our duty. Keywords: Active directory, helpdesk, software and hardware installations and testings.

 11.2009 - 01.2010
 Iso Omena's Library / Librarian

 My first internship and working experience in Finland.

 EDUCATION
 What I have learnt

 08.2014 - 05.2017
 Haaga-Helia University of Applied Sciences / Software Developer

 My high school studies and first bachelor degree in software development. Keywords: Java, Java2EE, Spring, Hibernate, JPA, JSP/JSTL, JavaScript, Nodejs, MongoDB, MariaDB

 08.2011 - 05.2014
 Suomen Liikemiesten Kauppaopisto / IT-Support

 My first professional studies related to IT. Starter as a very beginner later on got enough knowledge and experience to become a professional. Keywords: Ubuntu/Windows, Windows Server 2013/ApacheTomcat, SQL, HTML/CSS

 08.2008 - 05.2011
 Eiran Aikuislukio / Kielikurssit

 My second school in Finland. I did a lot of hard work to improve my finnish language skills in there. I also took a lot of "lukio" courses, I did them well and got about a half of lukio done.
 */

module.exports = mongoose.model('Page', page);