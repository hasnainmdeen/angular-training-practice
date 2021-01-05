import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';


// Resolver is some code that runs before a route is loaded to ensure that some data the route depends on is there

@Injectable({providedIn: 'root'}) // To provide application wide. Now we can inject this service into any service or component
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageSerive: DataStorageService,
              private recipeService: RecipeService) {}

  // whenever this route gets reloaded we are fetching the recipes thru this resolver service
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]>
  | Recipe[] {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      // we are not subscribing here because the resolver will subscribe for us to find out once data is there
      return this.dataStorageSerive.fetchRecipes();
    } else {
      return recipes;
    }

  }
}
