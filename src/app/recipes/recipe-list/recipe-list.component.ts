import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  constructor(private recipeService: RecipeService,
              // necesita Router para poder navegar
              private router: Router,
              // necesita ActivatedRoute para saber en que ruta esta actualmente
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    // si hay algun cambio, cuando crea una receta o actualiza, agrega esa nueva data para que se vea
    this.recipeService.recipesChanged
      .subscribe(
        // si cambia osea es success y sabe que trae recipes
        (recipes: Recipe[]) => {
          // le asigna el nuevo valor
          this.recipes = recipes;
        }
      );
    // lo que trae del constructor es el array y lo guarda en el array creado arriba.
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    // como ya esta en /recipes usa una url estatica y le pasa new osea queda /recipes/new
    // para que sepa que esta en /recipes usa ActivatedRoute
    // y como segundo parametro en objeto de js, le dice relativeTo y le pasa la ruta actual.
    this.router.navigate(['new'], {relativeTo: this.route});
  }



}
