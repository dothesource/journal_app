import { makeRequest } from './api'

export function register(user) {
  return makeRequest({
    path: 'users.json',
    method: 'POST',
    cacheId: 'user',
    body: user
  })
}
