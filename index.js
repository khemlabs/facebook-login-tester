const express = require('express'),
	http = require('http'),
	app = express(),
	server = http.createServer(app);

app.use(express.static('public'));

server.listen(process.env.PORT || 8080, function() {
	const address = server.address().address;
	const host = address && address !== '::' ? address : 'localhost',
		port = server.address().port;
	console.info('[app] Listening at http://%s:%s', host, port);
});
