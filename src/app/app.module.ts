import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
    /* todos los componentes de recipes estan importados en recipes/recipes.module.ts
    el servicio de recipe, lo deja en providers porque necesita que sea global el alcance de su data
    shopping-list y signin y signup tambien tienen sus modulos */
  ],
  imports: [
    BrowserModule,
    HttpModule,
    // importa app-routing.module.ts donde se configuran las rutas.
    AppRoutingModule,
    /* RecipesModule lo saca de aca y lo declara en una ruta en app-routing.module.ts para que cargue
    solamente cuando el usuario lo pida (lazy loading) */
    // comparte DropdownDirective para este modulo y para recipes.module.ts
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule
  ],
  // provee el servicio, porque tiene que pasar data desde shopping-list a recipes.
  // cuando pasa a shopping-list y vuelve a recipes, se sigue viendo las recetas agregadas.
  // DataStorageService trae la data de RecipeService y puede guardar con el boton save en header.component.html y ts
  // AuthService importa el sdk de firebase para poder loguearse al servicio y traer la data
  providers: [
    /* los providers van en core.module.ts para que este mas limpio este modulo */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
