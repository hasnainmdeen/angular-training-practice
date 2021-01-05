// import { resolve } from 'dns';

export class AuthSerive {
  loggedIn = false;

  isAuthenticated(){
    const promise = new Promise( // promise takes a method or function as argument
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 2000);
      }
    );
    return promise;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
