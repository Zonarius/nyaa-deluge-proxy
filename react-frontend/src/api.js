import axios from 'axios';

let api = axios.create({
  baseURL: '/api'
})

export function login(tokenId) {
  api = axios.create({
    baseURL: '/api',
    headers: {
      Authorization: tokenId
    }
  })
}

export function addMagnet(url) {
  return api.post('/addMagnet', { url })
}

export function search(query) {
  return api.get('/search', {
    params: { query }
  }).then(response => response.data)
}