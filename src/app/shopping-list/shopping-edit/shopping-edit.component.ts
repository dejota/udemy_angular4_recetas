import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // con ViewChild obtenemos el valor del input en el parametro ponemos la referencia del input en shopping-edit.component.html, declarar en import ViewChild y ElementRef.
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem() {
    // usa constante porque no va a cambiar esta manera de trabajar el codigo.
    // trae el valor de name y amount desde @ViewChild y lo agrega al modelo Ingredient por su parametro.
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    // como en shopping-list.service.ts con slice() crea una copia del array, no puede pushear.
    this.slService.addIngredient(newIngredient);
  }

}
