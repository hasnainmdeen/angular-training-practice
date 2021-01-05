import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  // activatedEmitter = new EventEmitter<boolean>();
  activatedEmitter = new Subject<boolean>(); // a subject is an special kind of an observable, you could say
  // using the subject is the recommended way. Don't use event emitter, use subject

  // with @Output we still need to use event emitter
}
