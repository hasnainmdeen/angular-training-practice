import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  // private servers: {id: number, name: string, status: string}[] = [];
  servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // unlike routerLink, the navigate does not know what's the relative path is relative to and by default it
    // is relative to root. So to configure this, we pass the second parameter (object) to navigate method
    // this.router.navigate(['servers'], {relativeTo: this.route});
  }

}
