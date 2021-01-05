import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService, AccountService] letting angular know where this service (dependency comes
                                               // from). In contrast to below, here we are overriding the
                                              // the instance of accounts service that comes from app component
  // providers: [LoggingService] // using the instance of accounts service that came from app component
                              // (root component)
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  // @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

  // adding dependency injection and telling angular that we need instance of this service
  constructor(private loggingService: LoggingService, private accountsService: AccountsService) { }

  onSetTo(status: string) {
    // this.statusChanged.emit({id: this.id, newStatus: status});
    this.accountsService.updateStatus(this.id, status);

    // console.log('A server status changed, new status: ' + status);
    // this.loggingService.logStatusChange(status);
    this.accountsService.statusUpdated.emit(status); // this will throw an event, defined in service, that we
    // can use in new-account component
  }
}
