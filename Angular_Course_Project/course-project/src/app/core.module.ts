import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorSerive } from './auth/auth-interceptor.service';
import { ShoppingListService } from './shopping-list/shopping-list-service';
import { RecipeService } from './recipes/recipe.service';

@NgModule({
  providers: [
    // since we had provided these services in AppModule. But the recommend approach to provide services
    // application wide is @Injectable({providedIn: 'root'}) on the service that we want to provide application
    // wide
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorSerive,
      multi: true
    }
    // Services are automatically injected to root level. We don't need to export
  ]
})
export class CoreModule {

}
