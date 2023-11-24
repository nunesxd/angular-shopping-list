import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map } from "rxjs/operators";

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
            .pipe(map(recipes => {
                return recipes.map(recipes => {
                    return {...recipes, ingredients: recipes.ingredients ? recipes.ingredients : []}
                });
            }))
            .subscribe( recipes => {
                this.recipeService.setRecipes(recipes);
            });
    }
}