const express = require('express');

const server = express();

server.get('/', (req, res) => {
	res.send('it is working');
})

server.listen(3000, () => {
	console.log('Server is running on port 3000');
});
