import "reflect-metadata"
import { injectable } from 'inversify'
import { Persistence } from './../entities/Persistence'
import { SessionStorageKeys } from './../enums/SessionStorageKeys'

@injectable()
export default class SessionStorageRepository implements Persistence {
  getItem<T>(key: string, defaultValue: T): T {
    const item = sessionStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  }

  getRawString(key: string, defaultValue: string): string {
    return sessionStorage.getItem(key) ? sessionStorage.getItem(key)! : defaultValue
  }

  setItem<T>(key: string, val: T): void {
    sessionStorage.setItem(key, JSON.stringify(val))
  }

  setRawItem(key: string, val: string) {
    sessionStorage.setItem(key, val)
  }

  removeItem(key: string) {
    sessionStorage.removeItem(key)
  }

  clear() {
    for (const key of this.enumKeys(SessionStorageKeys))
      sessionStorage.removeItem(SessionStorageKeys[key])
  }

  enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[]
  }
}