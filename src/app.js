const Path = require('path');
const express = require('express');
const nyaa = require('./nyaa');
const config = require('./config');
const deluge = require('./deluge');

const app = express();

app.get('/api/search', async (req, res) => {
  const torrents = await nyaa.loadTorrents(req.query.query);
  res.end(JSON.stringify(torrents, undefined, 2));
});

app.post('/api/add/:id', async (req, res) => {
  await deluge.addNyaaTorrent(req.params.id, req.query.path);
  res.end();
});

app.get('/api/config', (req, res) => {
  const publicConfig = {
    regex: config.config.regex
  };
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(publicConfig, undefined, 2));
});

app.post('/api/config', async (req, res) => {
  config.config.regex = {
    ...config.config.regex,
    ...JSON.parse(req.body)
  };
  await config.save();
  res.end();
});

app.get('/api/reload', async (req, res) => {
  await config.reload();
  res.end();
});

app.use(express.static(Path.join(__dirname, '..', 'frontend', 'dist')));

app.listen(8081);