import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: [ './recipe-edit.component.css' ]
})
export class RecipeEditComponent implements OnInit {
	id: number;
	editMode: Boolean = false;
	recipeForm: FormGroup;

	constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.id = +params['id'];
			this.editMode = params['id'] != null;
			console.log('edit mode:' + this.editMode);
			this.initForm();
		});
	}

	private initForm() {
		let recipeName = '';
		let recipeImagePath = '';
		let reciptDescription = '';
		let recipeIngredients = new FormArray([]);

		if (this.editMode) {
			const recipe = this.recipeService.getRecipe(this.id);
			recipeName = recipe.name;
			recipeImagePath = recipe.imagePath;
			reciptDescription = recipe.description;
			if (recipe['ingredients']) {
				for (let ingredient of recipe.ingredients) {
					recipeIngredients.push(
						new FormGroup({
							// bcs we dont have a single control but a group of control (name and amount)
							name: new FormControl(ingredient.name, Validators.required),
							amount: new FormControl(ingredient.amount, [
								Validators.required,
								Validators.pattern(/^[1-9]+[0-9]*$/)
							])
						})
					);
				}
			}
		}

		this.recipeForm = new FormGroup({
			name: new FormControl(recipeName, Validators.required),
			imagePath: new FormControl(recipeImagePath, Validators.required),
			description: new FormControl(reciptDescription, Validators.required),
			ingredients: recipeIngredients
		});
	}

	onSubmit() {
		// console.log(this.recipeForm);

		// const newRecipe = new Recipe(
		//   this.recipeForm.value['name'],
		//   this.recipeForm.value['description'],
		//   this.recipeForm.value['imagePath'],
		//   this.recipeForm.value['ingredients']
		// );

		if (this.editMode) {
			// this.recipeService.updateRecipe(this.id, newRecipe);
			this.recipeService.updateRecipe(this.id, this.recipeForm.value); // bcs recipe type exactly matches our form
		} else {
			// this.recipeService.addRecipe(newRecipe);
			this.recipeService.addRecipe(this.recipeForm.value);
		}

		// this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
		this.router.navigate([ '../' ], { relativeTo: this.route });
	}

	// get method can act as a property that we can only get but can't set. We get property by accessing it like
	// ingredientControls (withour parenthesis)
	// get ingredientControls() { // another way of doing the below thing
	//   return (this.recipeForm.get('ingredients') as FormArray).controls; // another way of casting into array
	// }

	getIngredientControls() {
		return (<FormArray>this.recipeForm.get('ingredients')).controls; // casting into Form Controls Array
		// return (this.recipeForm.get('ingredients') as FormArray).controls; // another way of casting into array
	}

	onAddIngredient() {
		(<FormArray>this.recipeForm.get('ingredients')).push(
			new FormGroup({
				name: new FormControl(null, Validators.required),
				amount: new FormControl(null, [ Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/) ])
			})
		);
	}

	onDeleteIngredient(index: number) {
		(<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
	}

	onCancel() {
		// this.recipeForm.reset();
		this.router.navigate([ '../' ], { relativeTo: this.route });
	}
}
