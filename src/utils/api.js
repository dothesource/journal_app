const URL = 'http://localhost:4000'

export async function makeRequest({ path, method = 'GET', body = undefined }) {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (body !== undefined) options.body = JSON.stringify(body)
  return fetch(`${URL}/${path}`, options).then(response => response.json())
}
