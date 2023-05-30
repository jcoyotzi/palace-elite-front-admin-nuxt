import "reflect-metadata"
import { injectable } from "inversify"
import { StorageKeys } from './../enums/StorageKeys'
import { Persistence } from './../entities/Persistence'

@injectable()
export default class LocalStorage implements Persistence {
  getItem<T>(key: string, defaultValue: T): T {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  }

  getRawString(key: string, defaultValue: string): string {
    return localStorage.getItem(key) ? localStorage.getItem(key)! : defaultValue
  }

  setItem<T>(key: string, val: T): void {
    localStorage.setItem(key, JSON.stringify(val))
  }

  setRawItem(key: string, val: string) {
    localStorage.setItem(key, val)
  }

  removeItem(key: string) {
    localStorage.removeItem(key)
  }

  clear() {
    for (const key of this.enumKeys(StorageKeys)) localStorage.removeItem(StorageKeys[key])
  }

  enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[]
  }
}