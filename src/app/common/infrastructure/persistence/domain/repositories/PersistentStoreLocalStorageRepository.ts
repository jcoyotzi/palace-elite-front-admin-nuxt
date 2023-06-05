// @ts-ignore
import stringify from 'json-stringify-safe'
import {Store} from 'pinia'
import PersistentStoreRepository from './PersistentStoreRepository'

export default class PersistentStoreLocalStorageRepository<T extends Store> implements PersistentStoreRepository<T>
{
  constructor(private readonly persistentKeys: string[]) {}

  clean(store: T): void {
    const storeName = store.$id
    if (this.isLocalStorageAvailable()) localStorage.removeItem(storeName)
  }

  hydrate(store: T): void {
    const existentState = localStorage.getItem(store.$id)
    if (existentState !== null && existentState !== undefined) {
      const state = JSON.parse(existentState)
      for (const key of this.persistentKeys) {
        
        
        // @ts-ignore
        store[key] = JSON.parse(state[key])
        
    
      }
    }
  }

  save(store: T): void {
    const storeName = store.$id
    const data: any = {}
    for (const key of this.persistentKeys) {
      // @ts-ignore
      data[key] = stringify(store[key])
    }
    // if instance of localeStore, save only the locale
    if (this.isLocalStorageAvailable()) localStorage.setItem(storeName, stringify(data))
  }

  isLocalStorageAvailable() {
    const test = 'isLocalStorageAvailable'
    try {
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch (e) {
      return false
    }
  }
}