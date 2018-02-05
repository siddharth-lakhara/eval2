// const Models = require('../models');
const https = require('https');

module.exports = [{
	method: 'GET',
	path: '/books',
	// path: 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks',
	handler: (req, res)=>{
		let dataString = '';
		let jsonObject = {};
		https.get('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', (response)=>{
			response.setEncoding('utf8');
			response.on('data', (data)=>{
				dataString += data;
			});
			response.on('end', ()=>{
				// jsonObject = JSON.parse(dataString);
				// console.log(jsonObject);
				res({
					data: dataString,
					statusCode: 200,
				});
			});
		});

	}
}];
/*
    Models.books.findAll().then((result => result.map(row => ({
			author: row.author,
			id: row.id,
			name: row.name
		}))))
			.then((bookList) => {
				res({
					data: bookList,
					statusCode: 200,
				});
			})
			.catch((error) => {
				res({
					data: `Error in fetching data => ${error}`,
					statusCode: 500,
				});
			});

	},
}];
*/
