import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipesArray: Recipe[];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipesArray = this.recipeService.getRecipes();
  }

  // onRecipeSelected(recipeElement: Recipe) {
  //   this.recipeWasSelected.emit(recipeElement);
  // }
}
