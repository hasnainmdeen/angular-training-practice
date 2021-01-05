
// an interface is simply a contract which can be imported by some other class which forces that class to
// provide some logic

import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// This interface required one thing from the component which implements it (canDeactivate method)
export interface CanComponentDeactivate {
  // canDeactivate method takes no argument but returns either an observable (resolved to a boolean), promise (resolved to a boolean)
  // or a boolean itself
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

// CanDeactivate (is an interface provided by angular router) is a genereic type so it will wrap our own interface
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  // this canDeactivate method will be called by angular router once we try to leave a route. Therefore this will
  // have the component on which we are currently on as an argument. And this component needs to be of type
  // CanComponentDeactivate, means it needs to be a component which has this (our) interface here implemented.
  // Therefore a component which has canDeactivate method
  canDeactivate(component: CanComponentDeactivate,
                currentRouter: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate(); // here we want to call can deactivate on the component we are currently
                                      // on and this is why we need to implement this interface in this
                                      // component. Why we created this interface in the first place because
                                      // now, angular router can execute canDeactivate in our service and can
                                      // rely on the fact that the component we are currently on has the
                                      // canDeactivate method because this is where we will actually implement
                                      // the logic checking wheter user is allowed to leave or not. Because we
                                      // need this connection between our guard (service) and component
  }
}
