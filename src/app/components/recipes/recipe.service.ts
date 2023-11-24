import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipesArray: Recipe[] = [
    new Recipe(
      'New Recipe Test 1', 
      'Test recipe 1', 
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=375,341',
      [new Ingredient('Bread', 1),
       new Ingredient('Cheese', 2)]),
    new Recipe(
      'New Recipe Test 2', 
      'Test recipe 2', 
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=375,341',
      [new Ingredient('Tomato', 2)])
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipesArray = recipes;
    this.recipesChanged.next(this.recipesArray.slice());
  }

  getRecipes() {
    // O 'slice' retorna uma cópia, se não enviaríamos uma refência direta ao array.
    return this.recipesArray.slice();
  }

  getRecipe(id: number) {
    return this.recipesArray[id];
  }

  addIngredientToShoppingList(ingredient: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredient);
  }

  addRecipe(recipe: Recipe) {
    this.recipesArray.push(recipe);
    // Devemos enviar um nova cópia, novo "slice", pois, se não, apenas teriamos a copia inicial de receitas, sem a atualização.
    this.recipesChanged.next(this.recipesArray.slice());
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipesArray[id] = newRecipe;
    this.recipesChanged.next(this.recipesArray.slice());
  }

  deleteRecipe(id: number) {
    this.recipesArray.splice(id, 1);
    this.recipesChanged.next(this.recipesArray.slice());
  }
}
