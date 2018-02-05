const hapi = require('hapi');
const routes = require('../routes');

const server = new hapi.Server();

server.connection({
	port: 8080,
	host: 'localhost'
});

server.route(routes);

server.start((err)=>{
	if (err)
		console.log(err);
});

module.exports = server;
