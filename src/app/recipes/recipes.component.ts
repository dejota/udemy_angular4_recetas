import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // el servicio RecipeService solo esta disponible para recipe.component.html y sus hijos html y ts.
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) {

  }

  ngOnInit() {
    // apenas inicia crea el listener y 
    this.recipeService.recipeSelected
      .subscribe(
        // recibe la data de RecipeService donde se emite la info de cuando hace clic.
        // (recipe: Recipe) argumento
        // => function
        (recipe: Recipe) => {
          // le pasa selectedRecipe el valor que viene de recipe
          this.selectedRecipe = recipe;
        }
      );
  }

}
