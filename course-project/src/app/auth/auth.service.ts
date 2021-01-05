import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signupURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
  private signinURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  private API_KEY = 'AIzaSyApt3mNjk067UK0xTnVkYw6F2wCqND0RaM';
  private tokenExpirationTimer: any;

  // userSubject = new Subject<User>(); // bcs using BehaviorSubject
  // token: string = null;
  // behaves like other subject but the difference is that behaviour subject also gives subscribers immdediate
  // access to the previously emitted value even if they haven't subscribe at the point of time that value was
  // emitter
  userSubject = new BehaviorSubject<User>(null);


  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
    .post<AuthResponseData>(
      this.signupURL + this.API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleError),
      tap(responseData => {
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
        );
      })
    );
  }

  login(email: string, password: string) {
    return this.http
    .post<AuthResponseData>(
      this.signinURL + this.API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleError),
      tap(responseData => {
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
        );
      })
    );
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token, // here token is a setter
      new Date(userData._tokenExpirationDate)
    );

    if(loadedUser.token){ // now token is a getter. Checking if the token is valid
      this.userSubject.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }

  }

  logout() {
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.userSubject.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage); // throwing an observable wrapping our error message
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'The email does not exist!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid email or password!';
        break;
    }
    return throwError(errorMessage);
  }
}
