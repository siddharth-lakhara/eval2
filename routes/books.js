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
				let loopVar = 0;
				let pr = new Promise((resolve)=>{
					for (let books in jsonObject.books){
					//console.log(books);
						let ratingString = '';
						let ratingObject = {};
						loopVar += 1;
						let id = jsonObject.books[books].id;
						https.get('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/'+id, (responseInner)=>{
							responseInner.setEncoding('utf8');

							responseInner.on('data', (data)=>{
								ratingString += data;
							});

							responseInner.on('end', ()=>{
								//console.log(ratingString);
								ratingObject = JSON.parse(ratingString);
								(jsonObject.books[books])['rating'] = ratingObject.rating;
								console.log(jsonObject.books); // verifying rating is appended
								if (loopVar === jsonObject.books.length){
									resolve(jsonObject);
								}
							});
						});
					}
				});
				pr.then(()=>{
					res({
						data: jsonObject,
						statusCode: 200,
					});
				});
			});
		});
	}
}];
