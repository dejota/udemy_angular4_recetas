/* las rutas de recipes se encuentran en recipes/recipes-routing.module.ts */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';

// crea una constante que es del tipo Routes
// importa Routes para poder crear las rutas
// a Routes le da valor de objetos de javascript, que van a ser las rutas que se pueden navegar.
const appRoutes: Routes = [
  /* cuando entra a home lo redirige a /recipes, para solucionar que tire error,
  porque angular no entiende que es solo para home, hay que agregar pathMatch */
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'shopping-list', component: ShoppingListComponent }
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
