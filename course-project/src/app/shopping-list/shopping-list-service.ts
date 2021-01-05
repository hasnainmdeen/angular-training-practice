import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from "../shared/ingredient.model";

// @Injectable({providedIn: 'root'})
export class ShoppingListService {

  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  // private ingredients: Ingredient[] = [
  //   new Ingredient('apples', 5),
  //   new Ingredient('tomatoes', 10)
  // ];
  private ingredients: Ingredient[] = [];

  getIngedients() {
    return this.ingredients.slice(); // to return a copy of ingredients array
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.getIngedients()); // emitting event to tell other components that list
                                                        // has been changed.
                                                        // subject use next() to emit or send value
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients){ this is a viable option but it will emit a lot of events
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients); // spread operator to convert array into list (multiple items)

    this.ingredientsChanged.next(this.getIngedients());
  }
}
