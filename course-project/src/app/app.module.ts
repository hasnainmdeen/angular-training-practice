import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
// import { RecipesModule } from './recipes/recipes.module';
// import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
// import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // AuthComponent,
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    // ReactiveFormsModule,
    HttpClientModule, // crucial to unlock the http client functionality in our app
    AppRoutingModule,
    // RecipesModule, // bcs loading this component lazily
    // ShoppingListModule, // bcs loading this component lazily
    SharedModule,
    CoreModule, // Even though we are not exporting anything from CoreModules bcs these are services
    // AuthModule // bcs loading this component lazily
  ],
  providers: [

  ],
  // providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
