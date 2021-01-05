// There is no decorator for service. A simple  class acts as a service
// it is highly discouraged to manually create instances of services

import { Injectable } from '@angular/core';

// @Injectable({providedIn: 'root'}) is the better approach to define a service's instance application-wide
@Injectable({providedIn: 'root'}) // Although not required but recommended in new versions of angular.
export class LoggingService{
  logStatusChange(status: string){
    console.log('A server status changed, new status: ' + status);
  }
}
