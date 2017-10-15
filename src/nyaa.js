const rssParser = require('rss-parser');
const config = require('./config').config;
const querystring = require('querystring');

async function loadTorrents(query) {
  return transform(await loadParseRss(query));
}

function transform(rss) {
  return rss.feed.entries
    .map(it => ({
      id: parseId(it),
      name: it.title,
      size: it['nyaa:size'],
      date: it.isoDate,
      seedCount: Number(it['nyaa:seeders']),
      leechCount: Number(it['nyaa:leechers'])
    }));
}

function parseId(entry) {
  return entry.guid.match(/^.*\/(.*)$/)[1];
}

async function loadParseRss(query) {
  const queryParams = querystring.stringify({
    page: 'rss',
    q: query,
    c: '0_0',
    f: '0'
  });
  const options = {
    customFields: {
      item: ['nyaa:size', 'nyaa:seeders', 'nyaa:leechers']
    }
  };

  return new Promise((res, rej) => {
    rssParser.parseURL(`${config.nyaaUrl}?${queryParams}`, options, (err, parsed) => {
      if (err) {
        rej(err);
      } else {
        res(parsed);
      }
    });
  });
}


module.exports = {
  loadTorrents
};
