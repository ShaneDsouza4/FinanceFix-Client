import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../interfaces/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USER: string = 'user';

  constructor(private router: Router) { }

  addUser(name: string) {
    const user: User = {
      id: uuidv4(),
      name: name
    }

    localStorage.setItem("user", JSON.stringify(user))
  }

  getUser() {
    let savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : {}
  }

  deleteUserAccount() {
    localStorage.clear();
    this.router.navigateByUrl('register')
  }

  isLoggedIn() {
    return Object.keys(this.getUser()).length > 0;
  }


}
