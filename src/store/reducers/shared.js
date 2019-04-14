export function updateDay(day, days) {
  let days_for_update = [...days]
  if (!!day.entries && day.entries.length === 0) {
    return days_for_update.filter(day_i => day_i.id !== day.id)
  }
  const index = days_for_update.findIndex(d => d.id === day.id)
  if (index !== -1) {
    days_for_update[index] = day
  } else {
    days_for_update.push(day)
  }
  return days_for_update
}
export function updateEntry({ entry: new_entry, text }, days) {
  const days_for_update = [...days]
  const day_to_update = days_for_update.find(d => d.id === new_entry.day_id)
  const entry_to_update = day_to_update.entries.find(e => e.id === new_entry.id)
  entry_to_update.text = text
  return days_for_update
}
