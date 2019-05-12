import { makeRequest } from './api'

export function register(user) {
  return makeRequest({
    path: 'users.json',
    method: 'POST',
    body: user
  })
}

export function login(user) {
  return makeRequest({
    path: 'users/sign_in.json',
    method: 'POST',
    cacheId: 'user',
    body: user
  })
}
