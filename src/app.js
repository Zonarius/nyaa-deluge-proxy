const Path = require('path');
const express = require('express');
const bodyParser = require('body-parser')

const nyaa = require('./nyaa');
const config = require('./config');
const deluge = require('./deluge');
const login = require('./login');

const app = express();
const port = 8080

app.use(login);

app.use(bodyParser.json())

app.get('/api/search', async (req, res) => {
  try {
    const torrents = await nyaa.loadTorrents(req.query.query);
    res.end(JSON.stringify(torrents, undefined, 2));
  } catch (err) {
    console.error(err);
    res.status(500);
    res.end(JSON.stringify(err, undefined, 2))
  }
});

app.post('/api/add/:id', async (req, res) => {
  await deluge.addNyaaTorrent(req.params.id, req.query.path);
  res.end();
});

app.post('/api/addMagnet', async (req, res) => {
  try {
    await deluge.addNyaaMagnet(req.body.url, req.body.path);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500);
    res.end(JSON.stringify(err, undefined, 2))
  }
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

app.use(express.static(Path.join(__dirname, '..', 'react-frontend', 'build')));

const server = app.listen(port, () => {
  console.log(`Listening on ${port}`)
});

process.on('SIGTERM', () => server.close());