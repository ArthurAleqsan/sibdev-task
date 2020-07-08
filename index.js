const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const API_URL = 'http://193.124.206.217:3000';

app.use('/auth', (req, res, next) => {
    next();
}, proxy({ target: API_URL, changeOrigin: true, }));
app.use('/users', (req, res, next) => {
    next();
}, proxy({ target: API_URL, changeOrigin: true, }));
app.use('/form', (req, res, next) => {
    next();
}, proxy({ target: API_URL, changeOrigin: true, }));


app.use('/public', express.static('public'));
app.use('/locales', express.static('locales'));
app.use('/assets', express.static('assets'));


app.use(async (req, res, next) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

