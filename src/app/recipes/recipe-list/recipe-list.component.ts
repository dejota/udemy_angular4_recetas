import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from './../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  // inicia el array del modelo Recipe.
  recipes: Recipe[];

  // en el constructor pasa en el parametro el servicio recipeService
  constructor(private recipeService: RecipeService) {
    
  }

  ngOnInit() {
    // lo que trae del constructor es el array y lo guarda en el array creado arriba.
    this.recipes = this.recipeService.getRecipes();
  }



  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
