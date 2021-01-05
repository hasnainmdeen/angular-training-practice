import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from "rxjs";

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;
  id;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // code in these 2 logs won't react to changes dynaimically just like params as it would not reload the component
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    // so for reactive, just like params observable, we have queryParams and fragment too
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      }
    );
    this.route.fragment.subscribe();
    // const id = +this.route.snapshot.params['id'];
    this.id = +this.route.snapshot.params['id'];
    console.log('id is: ' + this.id);
    this.server = this.serversService.getServer(this.id);

    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.id = params['id'];
    //     this.server = this.serversService.getServer(this.id);
    //   }
    // );

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    );

    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route}); // going one level up
  }

  // bcs CanDeavtivateGuard will eventually run canDeactivate in our component
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.allowEdit){
      return true;
    }
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved){
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

}
