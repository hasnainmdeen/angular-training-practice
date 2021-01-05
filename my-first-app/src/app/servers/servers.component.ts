import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-servers', // selecting by element
	// selector: '.app-servers', // selecting by class
	// selector: '[app-servers]', // selecting by attribute
	templateUrl: './servers.component.html',
	// template: '<app-server></app-server><app-server></app-server>', // alternatinely we can write html here or multi line html using ``
	styleUrls: [ './servers.component.css' ]
})
export class ServersComponent implements OnInit {
	// serverUser, showSecret, log[] variable for assignment
	serverUser = '';
	showSecret: Boolean = false;
	// log: number[] = [];
	log: Date[] = [];

	serverName = 'TestServer';
	serverCreationStatus: String = 'No server was created';
	allowNewServer: Boolean = false;
	serverCreated: Boolean = false;
	servers = [ 'Test Server 1', 'Teset Server 2' ];

	constructor() {
		setTimeout(() => {
			this.allowNewServer = true;
		}, 2000);
	}

	ngOnInit(): void {}

	onCreateServer() {
		// this.serverCreationStatus = ' server was created';
		this.serverCreated = true;
		this.servers.push(this.serverName);
		this.serverCreationStatus = this.serverName.concat(' server was created');
	}

	onUpdateServer(event: Event) {
		// console.log(event);
		// type casting in type Html input element and accessing it
		this.serverName = (<HTMLInputElement>event.target).value;
	}

	onToggleDetails() {
		this.showSecret = !this.showSecret;
		// this.log.push(this.log.length + 1);
		this.log.push(new Date());
	}
}
