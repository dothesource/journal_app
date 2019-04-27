import { makeRequest } from './api'

export function getDays() {
  return makeRequest({ path: 'days.json', cacheId: 'days' })
}

export function getDay(id) {
  return makeRequest({ path: `days/${id}.json` })
}

export function saveEntry(entry) {
  return makeRequest({
    path: 'entries.json',
    method: 'POST',
    body: { entry: { text: entry } }
  })
}
export function updateEntry(entry, text) {
  return makeRequest({
    path: `entries/${entry.id}.json`,
    method: 'PUT',
    body: { entry: { text: text } }
  })
}

export function archiveEntry(entry) {
  return makeRequest({
    path: `entries/${entry.id}/archive.json`,
    method: 'PUT'
  })
}
