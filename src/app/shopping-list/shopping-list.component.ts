import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../shared/ingredient.model';
// importa el servicio
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription

  // bindea slService
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    // asigna valor del bind slService cuando llama al metodo getIngredients
    this.ingredients = this.slService.getIngredients();
    // usa el servicio y el metodo ingredientsChanged y suscribe
    this.subscription = this.slService.ingredientsChanged
      .subscribe(
        // cada vez que haya un cambio en el array
        (ingredients: Ingredient[]) => {
          // le pasa el valor del array que hay ahora en ingredients.
          this.ingredients = ingredients;
        }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
