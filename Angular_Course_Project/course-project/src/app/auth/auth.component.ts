import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  loginMode = true;
  isLoading = false;
  error: string = null;

  @ViewChild(PlaceHolderDirective, {static: true}) alertHost: PlaceHolderDirective
  // will find the first occurance of this directive in the DOM

  private closeSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(authForm: NgForm) {
    console.log(authForm.value);
    if(!authForm.valid) {
      return;
    }

    this.isLoading = true;

    let authObservable: Observable<AuthResponseData>;

    const email = authForm.value.email;
    const password = authForm.value.password;

    if(this.loginMode){
      // ...
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signup(email, password);
    }

    authObservable.subscribe(responseData => {
      console.log(responseData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMessage => { // bcs we threw an error observable that just includes that error message
      console.log(errorMessage);
      this.error = errorMessage;
      // this.showErrorAlert(errorMessage); // to be deleted. Will not use this approach
      this.isLoading = false;
    });

    authForm.reset();

  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    if(this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

  private showErrorAlert(errorMsg: string) {
    // const alertCmp = new AlertComponent(); not gonna work. Angular can't access component like this
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    // pointer to the created component
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = errorMsg;
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    }); // only exception where we could subscribe to event emitter instead of subject
  }

}
