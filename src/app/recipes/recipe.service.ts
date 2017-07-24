import { Injectable, EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  // var recipeSelected crea un emisor y le pasa la clase Recipe del modelo recipe.model.ts
  // este se usa en recipe.component.ts para saber que receta selecciono en recipe-item.component.ts cuando clickea en recipe-item del html con el metodo onSelected()
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is a description', 'http://del.h-cdn.co/assets/15/28/980x490/landscape-1436393143-gettyimages-184130285.jpg'),
    new Recipe('Another test recipe', 'This is a description', 'http://www.landeffects.ca/Images/BLOG/Brick-Pizza-Oven.jpg')
  ];

  // crea este metodo para que devuelva el array recipes, y no puedan acceder desde afuera.
  getRecipes() {
    // usa el metodo slice para crear una copia de este array y no pisar el original.
    return this.recipes.slice();
  }

  constructor() { }

}
