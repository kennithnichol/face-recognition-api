require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const index = require('./controllers/index');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: process.env.DATABASE_SSL ? true : false
	}
});

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.get('/', index.handleIndex(db))
server.post('/signin', signin.handleSignin(db, bcrypt))
server.post('/register', register.handleRegister(db, bcrypt))
server.get('/profile/:id', profile.handleProfileGet(db))
server.put('/image', image.handleImage(db))
server.post('/imageurl', image.handleApiCall)

server.listen(process.env.PORT || 3000, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
