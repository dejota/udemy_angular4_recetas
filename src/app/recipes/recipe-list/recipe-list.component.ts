import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from './../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  // inicia el array del modelo Recipe.
  recipes: Recipe[];

  // en el parametro del constructor crea var recipeService y toma valor de todo lo que tiene la clase RecipeServie que trae del import
  constructor(private recipeService: RecipeService) {
    
  }

  ngOnInit() {
    // lo que trae del constructor es el array y lo guarda en el array creado arriba.
    this.recipes = this.recipeService.getRecipes();
  }

}
