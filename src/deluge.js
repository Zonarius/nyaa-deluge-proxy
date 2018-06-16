const Deluge = require('deluge-promise');
const config = require('./config').config;

const deluge = Deluge(config.deluge.url, config.deluge.password);

function addNyaaTorrent(id, path) {
  console.log(`Downloading torrent ${id} to ${path}`);
  const torrentUrl = `${config.nyaaUrl}/download/${id}.torrent`;
  return deluge.add(torrentUrl, {
    download_location: '/data',
    move_completed: true,
    move_completed_path: path
  });
}

function addNyaaMagnet(magnetUrl, path) {
  console.log(`Downloading magnet torrent to ${path}`);
  return deluge.add(magnetUrl, {
    download_location: '/data',
    move_completed: true,
    move_completed_path: path
  });
}

module.exports = {
  addNyaaTorrent,
  addNyaaMagnet
};
