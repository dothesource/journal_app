import { makeRequest } from './api'
export function searchEntries(query) {
  return makeRequest({ path: `entries.json?query=${query}` })
}
