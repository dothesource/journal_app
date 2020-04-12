import { IEntry } from "../interfaces/IEntry";
import { uuidv4 } from "../utils/generic";

export default class Entry implements IEntry {
    id: string
    text: string
    day_id: string
    datetime: Date
    archived_at?: Date
    created_at: Date
    updated_at: Date

    constructor(
        text: string,
        day_id: string,
        datetime: Date,
        created_at: Date,
        updated_at: Date,
        archived_at?: Date,
        id?: string
    ) {
        if (id) this.id = id
        else this.id = uuidv4()
        this.text = text
        this.day_id = day_id
        this.datetime = datetime
        this.archived_at = archived_at
        this.created_at = created_at
        this.updated_at = updated_at
    }

}