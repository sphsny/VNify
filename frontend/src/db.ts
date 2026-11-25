import Dexie from 'dexie'
import type { Table } from 'dexie'

// IndexedDB database
// https://dexie.org/docs/Tutorial/Design#database-versioning

/* binary files e.g. reader background image */
export interface StoredImage {
  key: string
  blob: Blob
}

class VNifyDB extends Dexie {
  // ! because dexie fills this instead of the constructor
  images!: Table<StoredImage, string>

  constructor() {
    super('vnify')
    this.version(1).stores({ images: 'key' })
  }
}

export const db = new VNifyDB()
