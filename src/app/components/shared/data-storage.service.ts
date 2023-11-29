import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    newUser: User;

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

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
        return this.authService.user.pipe(
            take(1), 
            exhaustMap(user => {
                return this.http.get<Recipe[]>(
                    'https://ng-http-49259-default-rtdb.firebaseio.com/recipes.json?auth=', 
                    {
                        params: new HttpParams().set('auth', user.token)
                    }
                );
            }),
            map(recipes => {
                return recipes.map(recipes => {
                    return {...recipes, ingredients: recipes.ingredients ? recipes.ingredients : []}
                });
            }), 
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        );
    }
}