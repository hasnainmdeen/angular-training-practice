import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { AccountsService } from './accounts.service';
import { LoggingService } from './logging.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NewAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  // providers: [AccountsService, LoggingService], tThis is replaced by @Injectable({providedIn: 'root'}) in
  // 6+ verison of angular. Although this approach also works but it is recommended to use
  // @Injectable({providedIn: 'root'}) on the service for application-wide instance of service. Hence this is
  // same as defining providers: [] in app.module.ts

  // the highest hierarchy to inject a service. With this we are making sure that every component uses the same
  // instance of accounts service unless we override it in any
  //  another service
  bootstrap: [AppComponent]
})
export class AppModule { }
