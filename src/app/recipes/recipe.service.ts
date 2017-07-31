import { Injectable, EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class RecipeService {
  // var recipeSelected crea un emisor y le pasa la clase Recipe del modelo recipe.model.ts
  // este se usa en recipe.component.ts para saber que receta selecciono en recipe-item.component.ts cuando clickea en recipe-item del html con el metodo onSelected()
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Hamburguesa',
      'de carne, cebolla, etc',
      'http://del.h-cdn.co/assets/15/28/980x490/landscape-1436393143-gettyimages-184130285.jpg',
    // le pasa un array de ingredientes  
    [
      new Ingredient('Carne', 1),
      new Ingredient('Cebolla', 1),
      new Ingredient('Tomate', 1),
      new Ingredient('Lechuga', 1)
    ]),
    new Recipe(
      'Pizza',
      'de muzzarella a la piedra',
      'http://www.landeffects.ca/Images/BLOG/Brick-Pizza-Oven.jpg',
    [
      new Ingredient('Harina', 1),
      new Ingredient('Tomate', 6),
      new Ingredient('Muzzarella', 1),
      new Ingredient('Aceite de Oliva', 1)
    ])
  ];

  // crea este metodo para que devuelva el array recipes, y no puedan acceder desde afuera.
  getRecipes() {
    // usa el metodo slice para crear una copia de este array y no pisar el original.
    return this.recipes.slice();
  }

  constructor() { }

}
