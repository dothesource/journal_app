import { IEntry } from './IEntry'

export interface IDay {
  id: string
  user_id?: string
  title: string
  created_at: Date
  updated_at: Date
  datetime: Date
  entries: IEntry[]
}
