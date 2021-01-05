import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  // empty path is part of every route. Default matching strategy is prefix
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {
    path: 'recipes',
    // LAZY LOADING
    // Now everything in this recipes module will be put into a separate code bundle which is then downloaded and parses on demand as soon as the user visits this page but not sooner
    // loadChildren: './recipes/recipes.module#RecipesModule'}// loadChildren tells angular pls only load the
                                                              // code contentor module i am going to point you
                                                              // atwhen the user visits the given path here
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) // an alternative syntax to load routes lazily
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(sl => sl.ShoppingListModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(auth => auth.AuthModule)
  }
  // {path: 'auth', component: AuthComponent}
];

@NgModule({
  // preloading the lazy loaded code. Although the lazy loaded coded is bundled separately but it tells angular to load modules as soon as possible
  // Initial code bundle is still kept small bcz there this code is not loaded. But when user is browsing and scrolling this happens in the background
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
