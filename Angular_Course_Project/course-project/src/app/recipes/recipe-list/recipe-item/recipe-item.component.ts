import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  // we want to recieve this recipe from outside (recipe-list). Hence we use @Input() decorator
  // @Input() recipe: Recipe = new Recipe('', '', '');
  @Input() recipe: Recipe;// we can leave the object undefined if it is meant to be set from outside. We are
                          // not forced to initialize the object always. such errors can be ignored
  @Input() index: number; // since we have the id as index here. we can get the id from recipe service here by
                          // passing the id. That's one way to refactoring it

  // disabled bcs using services now for cross-component communication
  // @Output() recipeSelected = new EventEmitter<void>();

  ngOnInit(): void {
  }

}
