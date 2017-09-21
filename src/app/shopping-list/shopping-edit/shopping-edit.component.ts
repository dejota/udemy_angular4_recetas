import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // le asigna el tipo Subscription, y este toma el valor cuando subscribe y lo usa para onDestroy
  subscription: Subscription;
  // indica que no se esta editando item
  editMode = false;
  // var para guardar index del item
  editedItemIndex: number;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    // subscribe al Subject startedEditing que trae del servicio ShoppingListService
    this.subscription = this.slService.startedEditing
    .subscribe(
      (index: number) => {
        // le asigna el valor del index
        this.editedItemIndex = index;
        // le cambia el valor a true para decir que esta editando
        this.editMode = true;
      }
    );
  }

  // el argumento form es del tipo NgForm y tiene que importarse arriba
  // en el archivo html el form le pasa el parametro f que es la referencia al formulario.
  onAddItem(form: NgForm) {
    // crea constante value y trae los valores del formulario
    const value = form.value;
    // crea constante newIngredient y le pasa por parametro los valores del input name y amount
    const newIngredient = new Ingredient(value.name, value.amount);
    // como en shopping-list.service.ts con slice() crea una copia del array, no puede pushear.
    this.slService.addIngredient(newIngredient);
    // una vez que hace submit y pushea los valores de los inputs al array, resetea el formulario.
    form.reset();
  }

  // destruye de la memoria lo que subscribe
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
