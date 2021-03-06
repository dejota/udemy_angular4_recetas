import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  // declara id de tipo number para poder usarlo en el subscribe.
  id: number;

  // inyecta el servicio de recipe
  constructor(private recipeService: RecipeService,
    // importa ActivatedRoute para saber el id que tiene la receta.
              private route: ActivatedRoute,
              // necesita Router para poder usar las rutas.
              private router: Router) { }

  ngOnInit() {
    // esta a la escucha del params observable y lo subscribe, con eso puede actuar a cualquier cambio que tenga.
    this.route.params
      .subscribe(
        // le pasa el tipo Params a params, gracias a Params importado desde router.
        (params: Params) => {
          // le asigna el valor que trae por url y le antepone el simbolo de + porque viene string y asi lo cambia a number
          // con esta informacion, recipe.service.ts puede saber que receta mostrar.
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);

          /* if(this.recipe === undefined) {
            console.log('no existe receta');
          } */
        }
      );
  }

  // metodo llamado en el click de To Shopping List en recipe-detail.component.html
  onAddToShoppingList() {
    /* ejecuta addIngredientsToShoppingList del servicio recipeService y le pasa por parametro los ingredientes de la receta,
    para poder mostrar esa data en shopping-list. */
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    /* con esta ruta no necesita usar la variable id, sino que sube un nivel, le pide this.id y despues le pone edit.
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route}); */
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
