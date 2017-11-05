import * as axios from 'axios'
import * as Rx from 'rxjs/Rx'

let api = axios.default.create({
  baseURL: '/api'
})

export const googleClientID = '1094098933377-h2er2a2nkep72q9g1jqto7n9qi20t18o.apps.googleusercontent.com'
export const torrents = new Rx.BehaviorSubject(undefined)
export const config = new Rx.BehaviorSubject(undefined)
export const login = new Rx.BehaviorSubject({
  loggedIn: false,
  google: {
    loaded: false
  }
})

export async function addTorrent(id, path) {
  const response = await api.post(`/add/${id}`, undefined, {
    params: { path }
  })

  return response.data
}

let searchCancelSource = axios.default.CancelToken.source()
export async function search(query) {
  searchCancelSource.cancel()
  searchCancelSource = axios.default.CancelToken.source()
  try {
    let response = await api.get(`/search`, {
      params: { query },
      cancelToken: searchCancelSource.token
    })
    response = response.data

    torrents.next(response)
    return response
  } catch (error) {
    if (!(error instanceof axios.default.Cancel)) {
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

export async function loggedIn(user) {
  login.next({
    loggedIn: false,
    google: {
      loaded: true,
      user: user.isSignedIn() ? user : undefined
    }
  })
}

login
  .filter(it => it.google.user && !it.loggedIn)
  .subscribe(async info => {
    const token = info.google.user.getAuthResponse().id_token

    const response = await api.get(`/login`, {
      headers: {
        Authorization: token
      }
    })

    if (response.data.loggedIn) {
      api = axios.default.create({
        baseURL: '/api',
        headers: {
          Authorization: token
        }
      })
      loadConfig()
    }
    login.next({
      ...info,
      loggedIn: response.data.loggedIn
    })
  })

export async function loadGoogleApi() {
  return new Promise((resolve, reject) => {
    const el = document.createElement('script')
    el.setAttribute('src', 'https://apis.google.com/js/platform.js')
    el.setAttribute('async', '')
    el.onload = () => {
      window.gapi.load('client:auth2', () => {
        window.gapi.auth2.init({
          client_id: googleClientID
        }).then(auth => {
          loggedIn(auth.currentUser.get())
          resolve()
        }, reject)
      })
    }
    el.onerror = reject
    document.head.appendChild(el)
  })
}
