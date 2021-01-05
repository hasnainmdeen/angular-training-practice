import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { Ingredient } from './ingredient.model';
import { AuthService } from '../auth/auth.service';

// bcs we will inject a service here
@Injectable({providedIn: 'root'})
export class DataStorageService {
  private baseURL = 'https://ng-course-recipe-book-d9ee0-default-rtdb.firebaseio.com';
  private firebaseConvention = '/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes() {

    const recipes = this.recipeService.getRecipes();
    // with firebase if we send a put request to a url, any data that's in there will be overwritten
    this.http
      .put(
        (this.baseURL + this.firebaseConvention),
        recipes
      ).subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    // Here our end goal was to use token in request for auth purpose
    // take tells that we only want one object (user) from the subscription and then it automatically
    // unsubscribe the subscription. Hence we dont need to manually unsubscribe
    // exhauseMap() waits for the first observable (for the user observable) to complete. Which happens
    // after we took the latest user. Thereafter, it gives us that user and now we return a new observable
    // in there which will then replace our previous observable in that entire observable chain and then finally
    // returning the over all observable
    // Returns the nested observable
    return this.http.get<Recipe[]>(
      (this.baseURL + this.firebaseConvention)
    )
    .pipe(
      map(recipes => { // map is an observable operator that allows us to transform the data in an observables chain
        return recipes.map(recipes => { // this map() is javascript function. Takes an anonymmous function that get executed for every element in that array
          // if ingredients are undefined in the fetched receipes, we will set an empty array in each recipe item that has undefined ingredients
          return {
            ...recipes,
            ingredients: recipes.ingredients ? recipes.ingredients : [] // spread operator to copy all the recipe items and then set into another array
          }
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );



    // .subscribe(recipes => {
    //   console.log(recipes);
    //   this.recipeService.setRecipes(recipes);
    // });
  }

}
