import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  // selector: 'appBasicHighlight' select by element
  selector: '[appBasicHighlight]' // to use as an attribute
})
export class BasicHighlightDirective implements OnInit  {
  // The type script shortcut private will set the property elementRef and also assign the same value to it
  // telling angular to instantiate the object the directive sits on
  // Getting the access to the element the directive was placed on
  constructor(private elementRef: ElementRef){

  }

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}
