import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // toma el valor del modelo creado en ../../recipe.model
  // el decorador @Input() permite que de afuera del componente pueda bindear (acceder a este dato).
  @Input() recipe: Recipe;

  // en el parametro del constructor crea var recipeService y toma valor de todo lo que tiene la clase RecipeServie que trae del import
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onSelected() {
    // cuando hace click en el item toma ese valor y lo pasa al emisor que importa de RecipeService.
    // en recipe.component.ts en ngInit esta a la escucha de esta seleccion.
    this.recipeService.recipeSelected.emit(this.recipe);
  }

}
