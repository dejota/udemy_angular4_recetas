import { Component, OnInit, Input } from '@angular/core';
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
  // con Input puede pasar index afuera de este componente
  @Input() index: number;

  ngOnInit() {
  }

}
