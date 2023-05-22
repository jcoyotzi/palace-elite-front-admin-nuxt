import {Store} from 'pinia'

export default interface PersistentStoreRepository<T extends Store> {
  save(store: T): void

  hydrate(store: T): void

  clean(store: T): void
}
