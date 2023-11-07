import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {}

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

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
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
              'ingredientName': new FormControl(ingredient.name, Validators.required),
              'ingredientAmount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imagePath': new FormControl(recipeImgPath, Validators.required),
      'ingredients': recipeIngredient,
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'ingredientName': new FormControl(null, Validators.required),
      'ingredientAmount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }));
  }

  onSubmit() {
    // Podemos passar o valor do forms diretamente, sem precisar criar um novo objeto.
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'], 
    //   this.recipeForm.value['description'], 
    //   this.recipeForm.value['imagePath'], 
    //   this.recipeForm.value['ingredients']
    // );
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
