import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core"

import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceHolderDirective } from './placeholder/placeholder.directive';

@NgModule({
  declarations: [ // only single declaration in allowed of each component even if we are using that component in multiple modules. Of course we will have to export and import accordingly for such a use case
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceHolderDirective,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceHolderDirective,
    DropdownDirective,
    CommonModule
  ]
})
export class SharedModule {

}
