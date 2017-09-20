import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // el servicio RecipeService solo esta disponible para recipe.component.html y sus hijos html y ts.
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {

  }

}
