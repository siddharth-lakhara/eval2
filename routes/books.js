// const Models = require('../models');
const https = require('https');

module.exports = [{
	method: 'GET',
	path: '/books',
	handler: (req, res)=>{
		let dataString = '';
		let jsonObject = {};

		https.get('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', (responseOuter)=>{
			responseOuter.setEncoding('utf8');
			responseOuter.on('data', (data)=>{
				dataString += data;
			});
			responseOuter.on('end', ()=>{
				jsonObject = JSON.parse(dataString);

				for (let books in jsonObject.books){
					let id = jsonObject.books[books].id;
					https.get('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/'+id, (responseInner)=>{
						let ratingString = '';
						let ratingObject = {};
						responseInner.setEncoding('utf8');
						responseInner.on('data', (data)=>{
							ratingString += data;
						});
						responseInner.on('end', ()=>{
							ratingObject = JSON.parse(ratingString);
							jsonObject.books[books]['rating'] = ratingObject.rating;
							console.log(jsonObject.books);
						});
					});
					// jsonObject.books[books]["ratings"] = valueFromAPI2
				}

				res({
					data: jsonObject,
					statusCode: 200,
				});

			});
		});

		// https.get();

	}
}];
