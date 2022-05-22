const express = require('express');

const router = express.Router();
const control = require('../controller/controller')
const db = require("../database/database");


const database = db.connection;
router.get('/', (req,res) => {
    res.render('../view/login');
})

router.get('/home', function(request, response) {

	if (request.session.loggedin) {
		response.render('../view/index');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

router.get('/tambah', function(request, response) {

	if (request.session.loggedin) {
		response.render('../view/register');
	} else {
		response.send('Please login to view this page!');
	} 
	response.end();
});

router.get('/data' , control.data);
router.post('/data' , control.search);

router.get('/logout' , (req, res) => {
    req.session.destroy(function(err){
    
        if(err){
        console.log(err);
        }
        else{
        res.redirect('/');
        }
    
        });
});


module.exports = router;