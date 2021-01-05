import { FormControl } from '@angular/forms';
import { promise } from 'protractor';
import { Observable } from 'rxjs';

export class CustomValidators {
  // static so that we can access it without having to instantiate our own class
  static invalidProjectName(control: FormControl): {[anyKey: string]: boolean} {
    if(control.value === 'Test'){
      return {'invalidProjectName': true};
    }
    return null;
  }

  static asyncInvalidEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise <any>( (resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com'){
          resolve({'invalidEmail': true});
        } else {
          resolve(null);
        }
      }, 2000);
    } );
    return promise;
  }
}
