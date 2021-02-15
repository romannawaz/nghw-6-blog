import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  USERS: IUser[] = [
    {
      username: 'admin',
      email: 'admin@gmail.com',
      password: '123',
      id: 0
    },
    {
      username: 'ivan',
      email: 'ii@gmail.com',
      password: '123',
      id: 1
    }
  ]

  constructor() { }

  getUser(emailField: string, passwordField: string): IUser {
    let user = this.USERS.filter(({ email, password }) => email == emailField && password == passwordField)[0];

    return user ? user : null;
  }

  addUser(newUsername: string, newEmail: string, newPassword: string): IUser {
    let res = this.USERS.some(({ username, email }) => email === newEmail || username === newUsername);

    if (!res) {
      let newUser: IUser = {
        username: newUsername,
        email: newEmail,
        password: newPassword,
        id: this.USERS[this.USERS.length - 1].id + 1
      }

      this.USERS.push(newUser);

      return this.getUser(newUser.email, newUser.password);
    }
  }
}
