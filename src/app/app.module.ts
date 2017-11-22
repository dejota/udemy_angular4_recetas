import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
    /* todos los componentes de recipes estan importados en recipes/recipes.module.ts
    el servicio de recipe, lo deja en providers porque necesita que sea global el alcance de su data
    shopping-list y signin y signup tambien tienen sus modulos */
  ],
  imports: [
    BrowserModule,
    HttpModule,
    // importa app-routing.module.ts donde se configuran las rutas.
    AppRoutingModule,
    // importa este modulo que tiene todos los imports de recipes y las rutas
    RecipesModule,
    // comparte DropdownDirective para este modulo y para recipes.module.ts
    SharedModule,
    ShoppingListModule,
    AuthModule
  ],
  // provee el servicio, porque tiene que pasar data desde shopping-list a recipes.
  // cuando pasa a shopping-list y vuelve a recipes, se sigue viendo las recetas agregadas.
  // DataStorageService trae la data de RecipeService y puede guardar con el boton save en header.component.html y ts
  // AuthService importa el sdk de firebase para poder loguearse al servicio y traer la data
  providers: [ShoppingListService, RecipeService, DataStorageService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
