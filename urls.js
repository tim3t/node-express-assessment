const fs = require('fs');
const axios = require('axios');
const path = require('path');

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
	console.log(res.value.config.url);

	const regex = /https:\/\/|http:\/\/?/gi;
	let shortenedFile = res.value.config.url.replaceAll(regex, '').split('/')[0];
	fs.writeFile(`${shortenedFile}.txt`, res.value.data, (err) => {
		if (err) {
			console.log(`Error writing file`, err);
		}
		else {
			console.log('Files created');
		}
	});
}

let path = process.argv[0];
