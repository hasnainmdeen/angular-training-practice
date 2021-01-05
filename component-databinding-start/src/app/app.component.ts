import { Component } from '@angular/core';
import { ServerElement } from './serverelement.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements:ServerElement[] = [new ServerElement('server', 'Test Server', 'Just a test!')];

  oddNumbers:number[] = []// For assignment
  evenNumbers:number[] = []// For assignment

  // here we do not have server name and content present in app component. We will pass these properties from
  // cockpit component that is implemented by app component to app component (parent/root component)
  onServerAdded(serverData: {serverName: string, serverContent:string}) {
    this.serverElements.push(new ServerElement('server', serverData.serverName, serverData.serverContent));
  }

  onBlueprintAdded(blueprintData: {blueprintName:string, blueprintContent:string}) {
    this.serverElements.push(new ServerElement('blueprint', blueprintData.blueprintName,
    blueprintData.blueprintContent));
  }

  onChangeFirst(){
    this.serverElements[0].name = 'changed!';
  }

  onDestroyFirst() {
    this.serverElements.splice(0, 1);
  }

  // Assignment
  onIntervalFired(firedNumber: number) {
    // console.log(firedNumber);
    if(firedNumber % 2 === 0){
      this.evenNumbers.push(firedNumber);
    }else{
      this.oddNumbers.push(firedNumber);
    }
  }

}

