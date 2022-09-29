const express = require('express');
let axios = require('axios');
var app = express();

app.post('/', (req, res) => {
	try {
		let results = req.body.developers.map(async (devName) => {
			return await axios.get(`https://api.github.com/users/${devName}`);
		});
		let out = results.map((result) => ({ name: result.data.name, bio: result.data.bio }));
		return res.send(JSON.stringify(out));
	} catch (err) {
		console.error('Error!', err);
	}
});

app.listen(3000);
