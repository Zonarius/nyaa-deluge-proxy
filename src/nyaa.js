const config = require('./config').config;
const cheerio = require('cheerio');
const rp = require('request-promise');

const attributes = {
  default: "default",
  success: "trusted",
  danger: "remake"
}

async function loadTorrents(query) {
  return transform(await searchNyaa(query));
}

function transform(html) {
  const $ = cheerio.load(html);
  return $('table.torrent-list tbody tr').map((i, el) => parseTorrent($(el))).get()
}

function parseTorrent($) {
  const tds = $.find('td');
  return {
    categoryId: tds.eq(0).find('a').attr('href').substr(4),
    id: tds.eq(1).find("a").attr('href').substr(6),
    name: tds.eq(1).find('a').last().text(),
    attribute: attributes[$.attr('class')],
    magnet: tds.eq(2).find("a").eq(1).attr('href'),
    size: tds.eq(3).text(),
    date: tds.eq(4).text(),
    seedCount: Number(tds.eq(5).text()),
    leechCount: Number(tds.eq(6).text())
  }
}

function parseId(entry) {
  return entry.guid.match(/^.*\/(.*)$/)[1];
}

function searchNyaa(query) {
  return rp.get(`${config.nyaaUrl}`, {
    qs: {
      q: query,
      c: '0_0',
      f: '0'
    }
  })
}


module.exports = {
  loadTorrents
};
