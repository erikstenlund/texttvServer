const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

const PORT=8080;

app.get('/:page', (req, res) => {
	MongoClient.connect('mongodb://localhost:27017/texttvDb', (err, db) => {
		if (err) { res.send(); }
		const col = db.collection('pages');
		col.find({ _id: parseInt(req.params.page, 10)}).toArray((err, items) => {
			if (err) { res.send(); }
			res.send(items[0]['data']);
		});
	});
});

app.listen(PORT, () => {
	console.log('Serving texttv to the people at ' + PORT);
});


