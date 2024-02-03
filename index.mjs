import express from 'express';
import corsAnywhere from 'cors-anywhere';
import path from 'path';

const proxy = corsAnywhere.createServer({
	originWhitelist: [], // Allow all origins
	requireHeaders: [], // Do not require any headers.
	removeHeaders: [] // Do not remove any headers.
});

const app = express();
const port = parseInt(process.env.PORT, 10) || 8080;

app.get('/cors/:proxyUrl*', (req, res) => {
	req.url = req.url.replace('/cors/', '/');
	proxy.emit('request', req, res);
});
app.get('*', (request, response) => {
	response.sendFile(path.resolve('client', 'dist', 'index.html'));
});

app.listen(port);
