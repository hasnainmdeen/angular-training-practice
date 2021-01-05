import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from '../servers.service';

interface Server {
  id: number,
  name: string,
  status: string
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService) {

  }


  // this resolver method will do the loading of our data in advance. And this will also work if it returns an
  // an observable or promise (in case of getServer() method executes asynchronous calls)
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> |
  Server {
    return this.serversService.getServer(+route.params['id']);// since resolver runs each time, so unlike
                                                              // component we don't need to set the observable
                                                              // here
  }
}
