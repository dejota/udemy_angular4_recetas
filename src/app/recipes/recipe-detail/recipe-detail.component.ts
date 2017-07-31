import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  // inyecta el servicio de recipe
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  // metodo llamado en el click de To Shopping List en recipe-detail.component.html
  onAddToShoppingList() {
    // ejecuta addIngredientsToShoppingList del servicio recipeService y le pasa por parametro los ingredientes de la receta, para poder mostrar esa data en shopping-list.
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

}
