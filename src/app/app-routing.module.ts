import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    {path:'', redirectTo: '/recipes', pathMatch:"full"},
    {path:'recipes', loadChildren: () => import('./components/recipes/recipes.module').then((mod) => mod.RecipesModule)},
    {path:'auth', loadChildren: () => import('./components/auth/auth.module').then((mod) => mod.AuthModule)},
    {path:'shopping-list', loadChildren: () => import('./components/shopping-list/shopping-list.module').then((mod) => mod.ShoppingListModule)},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}