const Models = require('../models');

module.exports = {
	method: 'GET',
	path: '/insert',
	handler: (req, reply)=>{
		// check if some book is already in DB.
		// Update or create accordingly
		Models.books.find(bookName).then((result)=>{
			if (result === null){ // create object
				Models.book.create({
          name: bookName.name;
          author: bookName.name;
          rating: bookName.name;
				}).
					then(()=>{
						reply({
							data: 'Value updated',
							statusCode: 201,
						});
					});
			}else{
				reply({
					data:'New object created and value updated',
					statusCode: 200
				});
			}

			reply('Done');
		});
	}
};
