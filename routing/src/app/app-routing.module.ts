import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerResolver } from './servers/server/server-resolver.service';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

// Defining routes
const appRoutes: Routes = [
  // {path: 'users/:id', component: UserComponent}, :id is the dynamic path. anything after /with be treated as id
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent, children: [
    {path: ':id/:name', component: UserComponent}
  ] },
  {path: 'servers',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      // this will now map the data this resolver gives us back (gives a server object) in this server
      {path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
      {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  },
  // {path: 'not-found', component: PageNotFoundComponent},
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} }, // passing static data
  // ** catches all paths that app does not know. Always keep it last as routes gets parsed from top to bottom
  {path: '**', redirectTo: '/not-found'}
]

@NgModule({
  imports: [
    // we can have two approaches. 1 is to get web server (hosting our angular app) return index.html in case
    // of route not found (404). 2 we can use hash in routes, this will tell the web server to just parse the
    // path before # and angular will take care of the route after hash
    RouterModule.forRoot(appRoutes) // approach 1
    // RouterModule.forRoot(appRoutes, {useHash: true}) // approach 2

  ], // Registering routes in our app
  exports: [RouterModule] // tells (what should be accessable) to the module that imports this module
})
export class AppRoutingModule { }
