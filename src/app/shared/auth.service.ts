import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  users = [
    {
      login: 'admin',
      password: 'admin',
      role: 'admin',
    },
    {
      login: 'user',
      password: 'user',
      role: 'user',
    },
  ];
  currentUser = { login: '', password: '', role: '' };
  admin = false;

  constructor() {}

  logIn(login: string, password: string) {
    if (
      this.users.find(
        (user) => user.login === login && user.password === password
      )
    ) {
      this.loggedIn = true;
      this.currentUser = this.users.find(
        (user) => user.login === login && user.password === password
      );
      this.admin = this.currentUser['role'] === 'admin';
    }
  }

  logOut() {
    this.loggedIn = false;
  }

  isAdmin() {
    const isAdminPromise = new Promise((resolve, reject) => {
      resolve(this.admin);
    });

    return isAdminPromise;
  }

  isLogged() {
    const isUserLogged = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });

    return isUserLogged;
  }
}
