import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list-service';
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // since it is also not using any @Output() we can replace it with a subject
  // recipeSelected = new EventEmitter<Recipe>();
  // recipeSelected = new Subject<Recipe>();

  // private so we can't directly access it from outside
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Big Burger',
  //     'Can you finish it all!',
  //     'https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-5.jpg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('Fries', 20),
  //       new Ingredient('Buns', 2)
  //     ]),
  //   new Recipe(
  //     'Italiano Pizza',
  //     'Extremely cheesey',
  //     'https://www.superhealthykids.com/wp-content/uploads/2019/08/July-Recipes-28-745x497.jpg',
  //     [
  //       new Ingredient('Chicken', 1),
  //       new Ingredient('Cheese', 2),
  //       new Ingredient('Dough', 1)
  //     ])
  // ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {

  }

  getRecipes(){
    return this.recipes.slice();  // this will return a copy of above array. So we really can't access this
                                  // private recipes from outside. If there was not slice(), it will return the
                                  // same private array because array is a reference type in javascript
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, updatedRecipe: Recipe) {
    this.recipes[index] = updatedRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
