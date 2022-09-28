const fs = require('fs');
const axios = require('axios');
const process = require('process');

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
				if (res.status === 'rejected') {
					console.error(`Error: ${res.reason.hostname} - ${res.status}`);
				}
				else {
					makeNewFile(res);
				}
			}
		}
	});
}

async function makeNewFile(res, err) {
	fs.writeFile(`${res.value.config.url}.txt`, res.value.data, (err) => {
		if (err) {
			console.log(`Error writing file`, err);
		}
		else {
			console.log('Files created');
		}
	});
}

let path = process.argv;
