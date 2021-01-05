import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserNames = ['Hasnain', 'abc'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        // 1. no need to call validation.required() as this will execute it. We only need to pass the reference to
        // this validation property and angular will itself execute it whenever validation check is required
        // 2. since we are not calling forbiddenNames() angular does not know what 'this' refers to. So using bind
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );

    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );

    // this.signupForm.setValue({
    //   'userData': {
    //     'username': 'Hasan',
    //     'email': 'has@test.com'
    //   },
    //   'gender': 'male',
    //   'hobbies': []
    // });

    // this.signupForm.patchValue({
    //   'userData': {
    //     'username': 'Hottie'
    //   }
    // });
  }

  // here we dont need to pass the form argument from template to typescript. bcs we created our own form here in typescript
  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    const control: FormControl = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  // the forbidden method returns an object. it shoud have any key and can be interpreted as string type and
  // value as boolean
  forbiddenNames(control: FormControl): {[anyKey: string]: boolean} {
    if(this.forbiddenUserNames.indexOf(control.value) !== -1){ // indexOf returns -1 if value is not part of array
      return {'nameIsForbidden': true};
    }
    return null;
  }

  // async validation. If we plan to use it in our template, we will have to use bind like we did with username
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout( () => {
        if(control.value === 'test@test.com'){
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
