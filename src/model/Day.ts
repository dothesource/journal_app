import { IDay } from "../interfaces/IDay";
import { uuidv4 } from "../utils/generic";
import { IEntry } from "../interfaces/IEntry";

export default class Day implements IDay {
    id: string
    title: string
    created_at: Date
    updated_at: Date
    datetime: Date
    entries!: IEntry[]

    constructor(
        title: string,
        created_at: Date,
        updated_at: Date,
        datetime: Date,
        id?: string
    ) {
        if (id) this.id = id
        else this.id = uuidv4()
        this.title = title
        this.created_at = created_at
        this.updated_at = updated_at
        this.datetime = datetime

        Object.defineProperties(this, {
            entries: { value: [], enumerable: false, writable: true },
        });
    }

}