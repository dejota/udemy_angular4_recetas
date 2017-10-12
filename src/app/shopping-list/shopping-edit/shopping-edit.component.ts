import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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
  /* con Viewchild selecciona el formulario de shopping-edit.component.html con #f="ngForm"
  y lo asigna a slForm con el tipo NgForm, declarado arriba, con esto le pasa el valor en subscribe */
  @ViewChild('f') slForm: NgForm;
  // le asigna el tipo Subscription, y este toma el valor cuando subscribe y lo usa para onDestroy
  subscription: Subscription;
  // indica que no se esta editando item
  editMode = false;
  // var para guardar index del item
  editedItemIndex: number;
  // var para guardar en el subscribe el ingrediente que trae en el metodo getIngredient desde shopping-list.service.ts
  editedItem: Ingredient;

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
        // le pasa el valor que devuelve getIngredient desde shopping-list.service.ts
        this.editedItem = this.slService.getIngredient(index);
        // con el console log se puede ver la data que trae cuando se hace clic en algun ingrediente en /shopping-list
        // Ingredient {name: "Apples", amount: 5}
        // console.log(this.editedItem);
        // le pasa los valores a los input name y amount, esto se ve la url /shopping-list
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  // el argumento form es del tipo NgForm y tiene que importarse arriba
  // en el archivo html el form le pasa el parametro f que es la referencia al formulario.
  onSubmit(form: NgForm) {
    // crea constante value y trae los valores del formulario
    const value = form.value;
    // crea constante newIngredient y le pasa por parametro los valores del input name y amount
    const newIngredient = new Ingredient(value.name, value.amount);
    // si this.editMode es true
    if (this.editMode) {
      // actualizar en shopping-list.service.ts con el metodo updateIngredient
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      // si this.editMode es false agrega el nuevo ingrediente
      // como en shopping-list.service.ts con slice() crea una copia del array, no puede pushear.
      this.slService.addIngredient(newIngredient);
      // una vez que hace submit y pushea los valores de los inputs al array, resetea el formulario.
      form.reset();
    }

    // una vez que agrega o edita el item, setea de nuevo editMode en false, para decir que ya no esta editando.
    this.editMode = false;
  }

  onClear() {
    /* apunta al form seleccionado con Viewchild arriba y lo resetea */
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    /* cuando hace clic en delete, resetea el form */
    this.onClear();
  }

  // destruye de la memoria lo que subscribe
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
