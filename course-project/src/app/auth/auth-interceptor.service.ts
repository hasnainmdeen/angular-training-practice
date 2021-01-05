import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorSerive implements HttpInterceptor {
	constructor(private authService: AuthService) {}
	intercept(req: HttpRequest<any>, next: HttpHandler) {
		return this.authService.userSubject.pipe(
			take(1),
			exhaustMap((user) => {
				if (!user) {
					return next.handle(req); // if user is not logged in initially we don't need to (and of course we can't) set the auth token in request
				}
				const modifiedRequest = req.clone({
					params: new HttpParams().set('auth', user.token)
				});
				return next.handle(modifiedRequest); // here we need to return an observable but above subject that we have subscribed to is also an observable
			})
		);
	}
}

// Here our end goal was to use token in request for auth purpose
// take tells that we only want one object (user) from the subscription and then it automatically
// unsubscribe the subscription. Hence we dont need to manually unsubscribe
// exhauseMap() waits for the first observable (for the user observable) to complete. Which happens
// after we took the latest user. Thereafter, it gives us that user and now we return a new observable
// in there which will then replace our previous observable in that entire observable chain and then finally
// returning the over all observable
// Returns the nested observable
