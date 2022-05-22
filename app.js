var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');


var app = express();


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());



// app.get('/', function(request, response) {
// 	response.sendFile(path.join(__dirname, 'public'));
// }); 

app.use(express.static(path.join('public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/css/img', express.static(path.join(__dirname, 'public/img')));

//enggine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//api
app.use('/', require('./routes/page'));
app.use('/', require('./routes/auth'));



app.listen(3000);