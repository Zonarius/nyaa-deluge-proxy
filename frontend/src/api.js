import * as axios from 'axios'
import * as Rx from 'rxjs/Rx'

const api = axios.create({
  baseURL: '/api'
})

export const torrents = new Rx.BehaviorSubject()
export const config = new Rx.BehaviorSubject()

export async function addTorrent(id, path) {
  const response = await api.post(`/add/${id}`, undefined, {
    params: { path }
  })

  return response.data
}

let searchCancelSource = axios.CancelToken.source()
export async function search(query) {
  searchCancelSource.cancel()
  searchCancelSource = axios.CancelToken.source()
  try {
    let response = await api.get(`/search`, {
      params: { query },
      cancelToken: searchCancelSource.token
    })
    response = response.data

    torrents.next(response)
    return response
  } catch (error) {
    if (!(error instanceof axios.Cancel)) {
      throw error
    }
  }
}

export async function reloadConfig() {
  const response = await api.get(`/reload`)
  return response.data
}

export async function loadConfig() {
  const response = await api.get(`/config`)
  config.next(response.data)
  return response.data
}
