import express from 'express';

const app = express();

app.listen(process.env.PORT || 3070, () => {
	console.log('listening on http://localhost:3070');
});

app.get('/', (req, res, next) => {
	res.json({
		name     : 'Terje',
		username : 'terjess'
	});
});
