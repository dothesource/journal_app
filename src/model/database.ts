import Dexie from 'dexie'
import { IDay } from '../interfaces/IDay'
import { IEntry } from '../interfaces/IEntry'
import { uuidv4 } from '../utils/generic'
import Day from './Day'
import Entry from './Entry'


class JournalAppDb extends Dexie {
  public days!: Dexie.Table<Day, string>
  public entries!: Dexie.Table<IEntry, string>
  constructor() {
    super('JournalAppDb')
    const db = this
    db.version(1).stores({
      days: 'id,user_id,title,created_at,updated_at,datetime,entries',
      // entries: 'id,text,day_id,datetime,archived_at,created_at,updated_at'
    })
    db.table("days").mapToClass(Day)
  }
}

// export async function loadEntries(day, db) {
//   day.entries = await db.entries.where('day_id').equals(day.id).toArray()
// }

// export async function save(day, db) {
//   return db.transaction('rw', db.days, db.entries, async () => {

//     await db.days.put(day);
//     const entryIds = await Promise.all(day.entries.map(entry => db.entries.put(entry)))

//     db.entries.where('day_id').equals(day.id)
//       .and(entry => entryIds.indexOf(entry.id) === -1)
//       .delete()
//   });
// }

export const db = new JournalAppDb()


// import Dexie from 'dexie';
// const db = new Dexie('JournalApp');
// db.version(1).stores({
//   days: 'id,user_id,title,created_at,updated_at,datetime',
//   entries: 'id,text,day_id,datetime,archived_at,created_at,updated_at'
// });
// export { db }