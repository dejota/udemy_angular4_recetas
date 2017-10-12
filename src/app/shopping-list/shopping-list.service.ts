import { Injectable } from '@angular/core';
// importa el modelo de ingredient
import { Ingredient } from '../shared/ingredient.model';

import { Subject } from 'rxjs/Subject';

// Provee el servicio en app.module.ts

@Injectable()
export class ShoppingListService {
  // emite Ingredient array
  ingredientsChanged = new Subject<Ingredient[]>();
  // aloja el index de los items para poder editarlos con el metodo onEditItem() que esta en shopping-list.component.ts
  startedEditing = new Subject<number>()

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  // crea metodo
  getIngredients() {
    // devuelve copia ingredients
    return this.ingredients.slice();
  }

  // espera un index del tipo number
  getIngredient(index: number) {
    // devuelve el ingrediente del array del index que le pasa, este dato lo usa shopping-edit.component.ts
    return this.ingredients[index];
  }

  // recibe ingrediente del tipo Ingredient
  addIngredient(ingredient: Ingredient) {
    // agrega al array de ingredients
    if (ingredient.name.length !== 0 ) {
      // al haber creado en getIngredients() una copia del array con slice() no puede pushear,
      // para solucionar esto crea un emitter ingredientsChanged
      this.ingredients.push(ingredient);
      // agrega la data dentro del array del slice
      this.ingredientsChanged.next(this.ingredients.slice());
    } else {
      alert('NOPE!');
    }
  }

  // este metodo recibe los ingredientes de recipe.service.ts y este mismo los recibe desde recipe-detail.component.ts
  addIngredients(ingredients: Ingredient[]) {
    // itera todos los ingredientes de la receta seleccionada.
    // for (let ingredient of ingredients) {
      // agrega el ingrediente al metodo de arriba.
      // this.addIngredient(ingredient);
    // }
    // pushea a ingredients con el operador spread de es6, que cambia un elemento de array en un elemento de lista.
    // ...ingredients <-- spread operator
    this.ingredients.push(...ingredients);
    // agrega la data dentro del array del slice
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  /* espera index del tipo number y newIngredient del tipo Ingredient,
  este metodo es necesario en onAddItem en shopping-edit.component.ts */
  updateIngredient(index: number, newIngredient: Ingredient) {
    // selecciona el item por index y le pasa valor newIngredient
    this.ingredients[index] = newIngredient;
    /* con ingredientChanged.next lo actualiza y crea un nuevo array con slice para no pisar el array original */
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    /* con splice saca elemento del array, pero al poner despues del index 1, solo saca ese elemento */
    this.ingredients.splice(index, 1);
    /* con ingredientChanged.next lo actualiza y crea un nuevo array con slice para no pisar el array original */
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  constructor() { }

}
