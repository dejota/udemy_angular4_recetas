/* en app.module importar el servicio y declararlo en providers */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { RecipeService } from './../recipes/recipe.service';
import { AuthService } from './../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/add/operator/map';

@Injectable()
export class DataStorageService {
  // para que funcione Http necesita estar importado en imports array en app.module.ts
  // con Http se puede hacer una peticion a una api
  constructor(private http: Http,
              // necesita agregarlo para traer data de RecipeService
              private recipeService: RecipeService,
              // injecta servicio para traer el token del metodo getToken() que devuelve firebase
              private authService: AuthService) { }

  storeRecipes() {
    // guarda el token que devuelve firebase
    const token = this.authService.getToken()

    /* en vez de usar post usa put, para que pueda sobrescribir la info si edita, al usar este metodo ya guarda la info.
    le pasa la url del proyecto creado en firebase, recipes es el nombre de la db y siempre tiene que ser .json , sino tira errores de CORS.
    como segundo parametro pasa lo que tiene que guardar en recipes.json.
    usa return para que header.component.ts pueda subscribir y ver la respuesta de firebase */
    return this.http.put('https://udemy-angular-4-ebd6b.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  getRecipes() {
    // guarda el token que devuelve firebase
    const token = this.authService.getToken()

    /* trae la data de la db service, obvio que tiene que estar creada.
    le agrega un parametro de consulta en la url ?auth= y le concatena el token
    sin el token correcto no trae la data */
    this.http.get('https://udemy-angular-4-ebd6b.firebaseio.com/recipes.json?auth=' + token)
      /* con map puede transformar la info que trae. */
      .map(
        (response: Response) => {
          /* crea constante recipes y le pasa lo que trae de la db en formato json, extrae la informacion y la transforma */
          const recipes = response.json();
          // recorre todas la recetas
          for (let recipe of recipes) {
            /* si la receta no tiene la propiedad ingredientes */
            if (!recipe['ingredients']) {
              /* crea la propiedad y le asigna un array vacio, para que cuando se agreguen ingredientes
              no tire error porque no existe la propiedad */
              recipe['ingredients'] = [];
            }
          }
          /* una vez transformada la respuesta que trajo de firebase retorna recipes */
          return recipes;
        }
      )
      .subscribe(
        /* crea recipes y espera un array de Recipe que trae de firebase */
        (recipes: Recipe[]) => {
          /* le pasa lo que trae desde firebase al metodo setRecipes de recipeService */
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
