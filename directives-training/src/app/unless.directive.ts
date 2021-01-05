import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  // we want to execute a method whenever the input expression/condition gets changed. It's a setter method.
  // It's still a property and method is a setter of property of direcive and its gets executed whenever the
  // property changes
  @Input() set appUnless(condition: Boolean) {
    if(!condition){
      this.vcRef.createEmbeddedView(this.templateRef);
    }else{
      this.vcRef.clear();
    }
  }

  // injecting what template and where the template needs to be rerendered.
  // Thus getting the access to these two things
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
