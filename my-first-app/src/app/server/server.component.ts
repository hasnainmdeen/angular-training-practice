import { Component } from '@angular/core';

@Component({
  // this information will be stored as metda date for this class in the background
  selector: 'app-server', // with this selector we can use this component in other components's html files
  templateUrl: './server.component.html',
  styles: [`
    .online{
      color: white;
    }
  `]
})
export class ServerComponent{
  // serverName: String = '';
  serverId: number = 10;
  serverStatus: String = 'offline';

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  getServerStatus(){
    return this.serverStatus;
  }

  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }

}
