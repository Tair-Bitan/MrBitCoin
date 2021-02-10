import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clear() {
    sessionStorage.clear();
  }

  store(key, value) {
    const val = JSON.stringify(value)
    sessionStorage.setItem(key, val);

  }

  load(key, defaultValue = null) {
    var value = sessionStorage.getItem(key);
    if (!value) return defaultValue
    else return JSON.parse(value);
  }
}
