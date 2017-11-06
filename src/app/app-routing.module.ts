import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';

// crea una constante que es del tipo Routes
// importa Routes para poder crear las rutas
// a Routes le da valor de objetos de javascript, que van a ser las rutas que se pueden navegar.
const appRoutes: Routes = [
  /* cuando entra a home lo redirige a /recipes, para solucionar que tire error,
  porque angular no entiende que es solo para home, hay que agregar pathMatch */
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // usa children en tercer parametro y crea un objeto de js.
  { path: 'recipes', component: RecipesComponent, children: [
    // usa esta ruta con RecipeStartComponent solo para pasar un mensaje de texto, de seleccionar receta
    { path: '', component: RecipeStartComponent },
    /* el orden es importante al usar urls dinamicas, si pongo new abajo de :id y despues :id/edit nunca va a entrar a new. */
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent }
  ] },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent }
];

@NgModule({
  imports: [
    CommonModule,
    // para configurar el RouterModule se le pasa appRoutes dentro del metodo forRoot, y asi angular sabe como entender esas rutas.
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    // para que estas rutas funcionen, hay que exportarlas a la app principal osea app.module.ts
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {

}
