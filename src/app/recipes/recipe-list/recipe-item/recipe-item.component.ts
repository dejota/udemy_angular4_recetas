import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // toma el valor del modelo creado en ../../recipe.model
  // el decorador @Input() permite que de afuera del componente pueda bindear (acceder a este dato).
  @Input() recipe: Recipe;
  // EventEmitter, no pasa información asi que le pone void.
  @Output() recipeSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.recipeSelected.emit();
  }

}
