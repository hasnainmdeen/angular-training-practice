import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
  // interceptor runs code before the request leaves our app
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // console.log('Request is on its way!');
    // console.log(req.url);

    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'abc')
    });
    return next.handle(modifiedRequest); // next lets the request to continue its journe
  }
}
