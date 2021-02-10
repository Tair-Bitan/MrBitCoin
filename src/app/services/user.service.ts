import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Move } from '../model/move.model';
import { User } from '../model/user.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  KEY = 'BTUser'

  constructor(
    private storageService: StorageService
  ) { }

  user: User = null
  user$ = new BehaviorSubject<User>({
    _id: '',
    name: '',
    coins: 100,
    moves: []
  })

  getUser() {
    const user = this.storageService.load(this.KEY)
    if (!user) return of(null)
    this.user = user
    this.user$.next(this.user)
    return this.user$
  }

  signup(name) {
    const user = new User()
    user.name = name
    user.setId()
    this.user = user
    this.storageService.store(this.KEY, this.user)
  }

  addMove(contact, amount) {
    let currUser = this.storageService.load(this.KEY)
    const move = new Move()
    move.amount = amount
    move.toId = contact._id
    move.to = contact.name
    const moves = [move, currUser.moves]
    currUser = { ...currUser, moves }
    currUser.coins -= amount
    this.user = currUser
    this.storageService.store(this.KEY, this.user)

    return currUser
  }

  // private _saveUser() {
  //   localStorage.setItem('BTUser', JSON.stringify(this.user))
  // }
}
