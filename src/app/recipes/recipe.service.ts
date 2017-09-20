import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

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

  // este metodo se ejecuta en recipe-detail.component.ts donde le pasa el id que trae por url.
  getRecipe(index: number) {
    return this.recipes[index];
  }

  // recibe los ingredientes
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  // apenas inicia le pasa el slService del servicio de ShoppingListService
  constructor(private slService: ShoppingListService) { }

}
