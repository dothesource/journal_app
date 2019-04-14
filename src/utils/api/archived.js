import { makeRequest } from './api'

export function getArchivedDays() {
  return makeRequest({ path: 'days/archived.json', cacheId: 'archivedDays' })
}

export function deleteEntry(entry) {
  return makeRequest({ path: `entries/${entry.id}.json`, method: 'DELETE' })
}

export function unArchiveEntry(entry) {
  return makeRequest({
    path: `entries/${entry.id}/unarchive.json`,
    method: 'PUT'
  })
}

export function updateArchivedEntry(entry, text) {
  return makeRequest({
    path: `/entries/${entry.id}.json`,
    method: 'PUT',
    body: { entry: { text: text } }
  })
}
