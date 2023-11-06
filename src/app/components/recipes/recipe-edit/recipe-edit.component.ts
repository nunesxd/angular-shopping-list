import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = Number(params['id']);
          // Se tivermos um 'id' na URL, estaremos no modo edição. Se não, teremos o 'new', que seria um novo, e não uma edição:
          this.editMode = params['id'] != null;
          // Quando mudamos o 'id' temos um indicativo de que o forms de edição foi alterado para um novo item, e por isso atualizamos os campos do respectivo forms:
          this.initForm();
        }
      );
  }

  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescription = '';
    let recipeIngredient = new FormArray([]);

    if(this.editMode) {
      let recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.image;
      recipeDescription = recipe.description;

      if(recipe['ingredients']) {
        for(let ingredient of recipe.ingredients) {
          recipeIngredient.push(
            new FormGroup({
              'ingredientName': new FormControl(ingredient.name),
              'ingredientAmount': new FormControl(ingredient.amount)
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImgPath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredient,
    });
  }

  onSubmit() {
    console.log(this.recipeForm)
  }

  get controls() {
    	return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
