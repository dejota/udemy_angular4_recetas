import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  /* cuando actualiza o agrega nueva receta lo agrega al array de abajo, pero no se ven los cambios,
  por que cuando trae los datos con getRecipes crea otro array con slice.
  crea un Subject y lo importa arriba y le pasa un array Recipe como valor */
  recipesChanged = new Subject<Recipe[]>();

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

  // apenas inicia le pasa el slService del servicio de ShoppingListService
  constructor(private slService: ShoppingListService) { }

  // crea este metodo para que devuelva el array recipes, y no puedan acceder desde afuera.
  getRecipes() {
    // usa el metodo slice para crear una copia de este array y no pisar el original.
    return this.recipes.slice();
  }

  // este metodo se ejecuta en recipe-detail.component.ts donde le pasa el id que trae por url.
  getRecipe(index: number) {
    return this.recipes[index];
  }

  // recibe los ingredientes y se los pasa al slService de shopping-list.service.ts
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  // le pasa por parametro recipe del tipo Recipe, osea el modelo que importa arriba, este metodo se usa en recipe-edit.component.ts
  addRecipe(recipe: Recipe) {
    // lo que trae cuando ejecuta este metodo, lo pushea a this.recipes
    this.recipes.push(recipe);
    // emite un nuevo valor con next y con slice crea una nueva copia de recipes
    this.recipesChanged.next(this.recipes.slice());
  }

  // le pasa index del tipo number y newRecipe del tipo Recipe
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

}
