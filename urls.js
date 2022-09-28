const fs = require('fs');
const axios = require('axios');
const { url } = require('inspector');

function readUrlFile(path) {
	fs.readFile(path, 'utf-8', async function callback(err, data) {
		if (err) {
			console.error(`Error reading file: ${path}`, err);
			process.exit(1);
		}
		else {
			let promiseUrls = [];
			for (url of data.split('\n')) {
				promiseUrls.push(axios.get(url));
				// makeNewFile(line);
			}
			let result = await Promise.allSettled(promiseUrls);
			for (res of result) {
				// makeNewFile(result);
				if (res.status === 'rejected') {
					console.log(res.status, res.hostname);
				}
				else {
					console.log(res.status, res.value.config.url);
				}
			}
		}
	});
}

function makeNewFile(data, err) {
	fs.writeFile(data.hostname, data.data, (err) => {
		if (err) {
			console.log(`Error writing file`, err);
		}
		else {
			console.log('Files created');
		}
	});
}
