'use strict';

var sql = require('mssql');

var conn = new sql.Connection({
	user: 'USER_ID',		// Replace with a database login ID.
    password: 'PASSWORD',	// Replace with the matching password.
    server: 'HOST_NAME',	// Replace with the name of the machine hosting the database.
    database: 'DATABASE'	// Replace with the actual database name.
});

conn.connect(function(err){
	if(!!err) {
		console.log('An error occured.');
		console.dir(err);
		return;
	}
	
	// Do something
	var request = new sql.Request(conn);
	
	request.query('select SUSER_NAME() as suser;', (err,recordset) => {
		if(!!err) {
			console.log('An error occured.');
			console.dir(err);
			return;
		}
		
		console.log('Connection established.');
		console.dir(recordset);
	});

	// Close the connection once we're done with it.
	conn.close();
});