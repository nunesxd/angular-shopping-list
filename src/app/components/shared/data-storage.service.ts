import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipe() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-http-49259-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(
                response => {
                    console.log(response);
                }
            );
    }

    fecthRecipe() {
        this.http.get<Recipe[]>('https://ng-http-49259-default-rtdb.firebaseio.com/recipes.json')
            .subscribe( recipes => {
                this.recipeService.setRecipes(recipes);
            });
    }
}