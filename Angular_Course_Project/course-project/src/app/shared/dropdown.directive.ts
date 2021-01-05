import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]' // how are we going to define our directive and we are using an attribute selector
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen: Boolean = false;
  @HostListener('click') toggleOpen(event: Event){
    this.isOpen = !this.isOpen;
  }
}
