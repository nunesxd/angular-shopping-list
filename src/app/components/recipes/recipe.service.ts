import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  private recipesArray: Recipe[] = [
    new Recipe(
      'New Recipe Test 1', 
      'Test recipe 1', 
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=375,341',
      [new Ingredient('Bread', 1)]),
    new Recipe(
      'New Recipe Test 2', 
      'Test recipe 2', 
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=375,341',
      [new Ingredient('Tomato', 2)])
  ];

  constructor(private shoppingListService: ShoppingListService) {}

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
}
