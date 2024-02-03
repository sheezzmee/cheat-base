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

app.use('/public', express.static(path.resolve('public')));
app.get('/cors/:proxyUrl*', (req, res) => {
    req.url = req.url.replace('/cors/', '/');

    if (!req.url.includes('https://') && req.url.includes('https:/')) {
        req.url = req.url.replace('https:/', 'https://');
    }

    proxy.emit('request', req, res);
});
app.get('*', (request, response) => {
    response.sendFile(path.resolve('public', 'index.html'));
});

app.listen(port);
