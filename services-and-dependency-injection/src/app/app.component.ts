import { Component, OnInit } from '@angular/core';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // providers: [AccountsService] Even though app component is the root component, the highest possible level
  // that a service can be Injected to is app module.ts. And this also helps in injecting service into service
  // so we are not injecting accounts service in app component anymore but in app module.ts. Hence this
  // providers list is commented out
})
export class AppComponent implements OnInit {

  accounts: {name: string, status: string}[] = [];

  // Injecting Service into component
  constructor(private accountsService: AccountsService) {}

  // The best place to initialize anything is ngOnInit()
  ngOnInit() {
    this.accounts = this.accountsService.accounts; // accounts is an array and hence is a reference type.
                                                   // so we are setting account here, refer to the same place
                                                   // in memory
  }
}
