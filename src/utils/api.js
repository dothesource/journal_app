import AsyncStorage from '@callstack/async-storage'
const URL = 'http://localhost:4000'

export async function getCached(cacheId) {
  if (cacheId === undefined) return cacheId
  const cachedResp = await AsyncStorage.getItem(cacheId)
  if (cachedResp) {
    try {
      const response = JSON.parse(cachedResp)
      return response
    } catch (error) {
      console.log('could not parse cached response')
      return undefined
    }
  }
}

export async function setCached(cacheId, value) {
  const string_value = JSON.stringify(value)
  AsyncStorage.setItem(cacheId, string_value)
    .then(() => {
      console.log(cacheId, 'cached')
    })
    .catch(() => {})
}

export async function makeRequest({
  path,
  method = 'GET',
  body = undefined,
  cacheId
}) {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (body !== undefined) options.body = JSON.stringify(body)

  const cachedResp = await getCached(cacheId)
  if (method === 'GET' && cachedResp) return cachedResp
  return fetch(`${URL}/${path}`, options)
    .then(response => response.json())
    .then(json => {
      if (method === 'GET') {
        setCached(cacheId, json)
      }
      return json
    })
}
