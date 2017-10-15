const Deluge = require('deluge-promise');
const config = require('./config').config;

const deluge = Deluge(config.deluge.url, config.deluge.password);

function addNyaaTorrent(id, path) {
  const torrentUrl = `${config.nyaaUrl}/download/${id}.torrent`;
  return deluge.add(torrentUrl, path);
}

module.exports = {
  addNyaaTorrent
};
