import express from 'express';
import path from 'path';
const app = express();

app.listen(process.env.PORT || 3070, () => {
	console.log('listening on http://localhost:3070');
});

app.get('/test', (req, res) => {
	res.send('this is a test');
});
app.use(express.static('../client/dist'));
app.use((req, res, next) => {
	if (req.method === 'GET' && !req.path.startsWith('/api/')) {
		res.sendFile(path.resolve('../client/dist/index.html'));
	}
	else {
		next();
	}
});
