const req = require('request');
const express = require('express');
const app = express();
const port = 3000;
const parseString = require('xml2js').parseString;


let rssJson = '';

app.use(express.static(__dirname + '/src'));

app.get('/api/feed-url', (request, response) => {
    let requestRssUrl = request.query.feedUrl;
    req(requestRssUrl, (err, res, body) => {
        parseString(body, (err, result) => {
            rssJson = result;
        });
        console.log(res.statusCode);
        response.send(rssJson);
    });
});

app.listen(port, () => {
    console.log('server is listening');
});