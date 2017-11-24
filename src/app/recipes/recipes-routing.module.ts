/* rutas de recipes/recipes.module.ts */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { AuthGuardService } from '../auth/auth-guard.service';

const recipesRoutes: Routes = [
  // usa children en tercer parametro y crea un objeto de js.
  /* como se agrego la ruta en app-routing.module.ts para que cargue solo cuando lo pide el usuario
  esta ruta tiene que apuntar '' para que entienda que va a recipes  */
  { path: '', component: RecipesComponent, children: [
    // usa esta ruta con RecipeStartComponent solo para pasar un mensaje de texto, de seleccionar receta
    { path: '', component: RecipeStartComponent },
    /* el orden es importante al usar urls dinamicas, si pongo new abajo de :id y despues :id/edit nunca va a entrar a new.
    el parametro canActivate usa en el array la clase del servicio AuthGuardService, sino esta logueado no redirige a esa ruta */
    { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService] },
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService] }
  ] },
];

@NgModule({
  imports: [
    /* para configurar el RouterModule se le pasa la constante de arriba recipesRoutes
    dentro del metodo forChild, y asi angular sabe como entender esas rutas. */
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [
    // para que estas rutas funcionen, hay que exportarlas a la app principal osea app.module.ts
    RouterModule
  ],
  declarations: [],
  providers: [
    /* provee AuthGuardService aca, ya que solo lo usa en este modulo con canActivate  */
    AuthGuardService
  ]
})

export class RecipesRoutingModule{}
