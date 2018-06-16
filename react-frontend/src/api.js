import axios from 'axios';

let api = axios.create({
  baseURL: '/api'
})

let config;
let matcher;

export function login(tokenId) {
  api = axios.create({
    baseURL: '/api',
    headers: {
      Authorization: tokenId
    }
  })
}

export function addMagnet(url, path) {
  return api.post('/addMagnet', { url, path })
}

export function search(query) {
  return api.get('/search', {
    params: { query }
  }).then(response => response.data)
}

export function getConfig() {
  if (!config) {
    config = api.get('/config').then(r => r.data);
  }
  return config;
}

export async function toPath(name) {
  if (!matcher) {
    const config = await getConfig();
    matcher = config.regex.map(patt => new RegExp(patt));
  }
  const defaultLoc = '/data/finished'
  const serien = defaultLoc + '/serien'

  for (const pattern of matcher) {
    const matches = name.match(pattern)
    if (matches) {
      const info = {
        name: matches[1],
        season: matches[2]
      }
      if (info.season) {
        return `${serien}/${info.name.trim()}/Season ${info.season.trim()}`
      } else {
        return serien + '/' + info.name.trim()
      }
    }
  }
}