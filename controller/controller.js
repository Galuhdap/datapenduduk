const db = require("../database/database");


const database = db.connection;



exports.login = (request, response) => {
    var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true; 
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}}


exports.input = (req , res ) => {

	const {ktp , nama , tgl , alamat } = req.body;

	db.query('SELECT ktp_penduduk FROM datapenduduk WHERE ktp_penduduk = ? ' , [ktp] , (error , result) => {
		if(error){
			console.log(error);
		} else
		if(result.length > 0) {
			console.log('accoont sudah ada');
			res.send ({ message : 'Data Sudah Ada'});
		}
	})
	
	db.query('INSERT INTO datapenduduk SET ? ', {ktp_penduduk: ktp , nama_penduduk: nama, tgl: tgl, alamat_penduduk: alamat}, (error , result) => {
		if(error){
			console.log(error)
		} else {
			console.log("Data Sudah Terdaftar")
			return res.render('../view/register', {
				message : 'Data Sudah Terdaftar'
			});
		}
	})
	
}

exports.sosmed = (req , res) => {
	var nama = req.body.text;
	var password = req.body.password;

	if(nama == 'galuh' || password == 'galuh'){
		res.send('bisa masuk');
	} else {
		res.send('tidak masuk')
	}
}

exports.data = (req, res) => {
	db.query('SELECT * FROM datapenduduk', (error , results) => {
		if(error){
			console.log(error)
		} else  {
			var data = {
				data:results
			}
			// res.json({ status: 200 ,payload: data});
			res.render('../view/data', data);
		} 
	});
}

exports.search = (req, res) => {

	let searchTerm = req.body.search;

	db.query('SELECT * FROM datapenduduk WHERE nama_penduduk LIKE ?',['%' + searchTerm + '%'] ,(error , results) => {
		if(error){
			console.log(error)
		} else {
			console.log("Masuk")
			var data = {
				data:results
			}
			res.render('../view/data', data);
		}
		
	});
}

exports.del = (req,res) => {

	const {id} = req.body

	db.query('DELETE FROM contact WHERE id = ? ', [id], (error, results) => {
		if(error){
			console.log(error);
		} else {
			res.json({status: 200, payload: results})
		}
	})
}

