import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  projectForm: FormGroup;
  forbiddenProjectNames = ['Test'];

  constructor() { }

  ngOnInit() {
    this.projectForm = new FormGroup({
      // 'projectName': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
      'projectName': new FormControl(null, [Validators.required, CustomValidators.invalidProjectName]),
      // 'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      'email': new FormControl(null, [Validators.required, Validators.email], [CustomValidators.asyncInvalidEmail]),
      'status': new FormControl('stable') // default value
    });
  }

  onCreateProject() {
    console.log(this.projectForm);
    console.log(this.projectForm.value);
  }

  forbiddenNames(control: FormControl): {[any: string]: boolean} {
    if(this.forbiddenProjectNames.indexOf(control.value) !== -1){
      return {'projectNameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>( (resolve, reject) => {
      setTimeout( () => {
        if(control.value === 'test@test.com'){
          resolve({'emailIsForbidden': true});
        } else{
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }

}
