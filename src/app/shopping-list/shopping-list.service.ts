import { Injectable, EventEmitter } from '@angular/core';
// importa el modelo de ingredient
import { Ingredient } from '../shared/ingredient.model';

// Provee el servicio en app.module.ts

@Injectable()
export class ShoppingListService {
  // emite Ingredient array
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  // crea metodo
  getIngredients() {
    // devuelve copia ingredients
    return this.ingredients.slice();
  }

  // recibe ingrediente del tipo Ingredient
  addIngredient(ingredient: Ingredient) {
    // agrega al array de ingredients
    

    if (ingredient.name.length !== 0 ) {
      // al haber creado en getIngredients() una copia del array con slice() no puede pushear, para solucionar esto crea un emitter ingredientsChanged
      this.ingredients.push(ingredient);
      // agrega la data dentro del array del slice
      this.ingredientsChanged.emit(this.ingredients.slice());
    } else {
      alert('NOPE!');
    }

    
  }

  constructor() { }

}
