const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require('uuid');
const app = express();

app.set('trust proxy', 1);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
	session({
		secret: "password",
		resave: true,
		rolling: true,
		saveUninitialized: true,
		cookie: {
			maxAge: 60 * 60 * 1000,
		},
		genid: uuidv4,
	}),
);

app.get('/', (req, res) => {
	const sess = req.session;
	console.log(sess);
	res.status(200).json();
});

app.post('/login', (req, res) => {
	const { username } = req.body;
	const sess = req.session;
	sess.username = username;
	res.status(200).json();
});

app.get('/home', (req, res) => {
	const sess = req.session;
	console.log(sess.username);
	res.status(200).json();
});


app.get('/logout', (req, res) => {
	const sess = req.session;
	req.session.destroy((err) => {
		return res.status(500).json();
	});
	res.status(200).json();
});

app.listen(3000, () => {
	console.log("Server running on Port 3000");
});

