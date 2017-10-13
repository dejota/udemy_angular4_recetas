import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../recipe.model';
import { RecipeService } from './../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // inicia el array del modelo Recipe.
  recipes: Recipe[];
  // crea una variable del tipo Subscription y lo importa arriba
  subscription: Subscription;

  // en el parametro del constructor crea var recipeService y toma valor de todo lo que tiene la clase RecipeServie que trae del import
  constructor(private recipeService: RecipeService,
              // necesita Router para poder navegar
              private router: Router,
              // necesita ActivatedRoute para saber en que ruta esta actualmente
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    // si hay algun cambio, cuando crea una receta o actualiza, agrega esa nueva data para que se vea
    // guarda el subscribe en la var para poder desuscribirlo en onDestroy
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        // si cambia osea es success y sabe que trae recipes
        (recipes: Recipe[]) => {
          // le asigna el nuevo valor
          this.recipes = recipes;
        }
      );
    // lo que trae del constructor es el array y lo guarda en el array creado arriba.
    // this.recipes trae todas las recetas.
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    // como ya esta en /recipes usa una url estatica y le pasa new osea queda /recipes/new
    // para que sepa que esta en /recipes usa ActivatedRoute
    // y como segundo parametro en objeto de js, le dice relativeTo y le pasa la ruta actual.
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    // desuscribe para que no quede en memoria
    this.subscription.unsubscribe();
  }

}
