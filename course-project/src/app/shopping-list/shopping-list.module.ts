import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
// import { ShoppingListRoutingModule } from './shopping-list.routing.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    // CommonModule, // unlocks ng-if and ng-for. Alternative of BrowserModule. Now importing from SharedModule
    // ShoppingListRoutingModule // bcs can be out sourced too.
    FormsModule, // for template driven forms
    RouterModule.forChild(
      [
        // {path: 'shopping-list', component: ShoppingListComponent}
        {path: '', component: ShoppingListComponent}
      ]
    ),
    SharedModule
  ]
})
export class ShoppingListModule {

}
