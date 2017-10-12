import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  // es para que cuando esta creando una nueva receta, no esta en modo de edicion.
  editMode = false;
  /* crea la propiedad recipeForm y le pasa el tipo FormGroup que es importado arriba */
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              // inyecta en el constructor el servicio RecipeService
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          // si la url tiene id hace todo lo de abajo
          this.id = +params['id'];
          // si en la url tiene id editMode pasa a true, si no tiene id queda en false.
          // params['id'] != null <-- si id no es nulo da resultado true, por eso cambia this.editMode a true.
          this.editMode = params['id'] != null;
          // console.log(this.editMode);
          // inicializa el metodo initform
          this.initForm();
        }
      )
      // console.log(this.id);
  }

  onSubmit() {
    // pregunta si esta en editMode
    if (this.editMode) {
      // si esta editando, lo actualiza y le pasa el id y para aprovechar la ventaja de form reactve,
      // le pasa this.recipeForm.value, que le pasa todos los valores del input este metodo es de recipe.service.ts
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value)
    }

    /* cuando hace clic en save, muestra en consola que valores trae, para verlos, click en formGroup
    click en values y se ven los valores de los campos */
    // console.log(this.recipeForm);
  }

  /* a la escucha del clic en Add Ingredient en el html */
  onAddIngredient() {
    /* al poner esto asi (<FormArray>this.recipeForm.get('ingredients')) puede pushearlo */
    (<FormArray>this.recipeForm.get('ingredients')).push(
      /* crea un nuevo FormGroup */
      new FormGroup({
        // y dentro de FormGroup crea FormControl y se lo pasa a name, imagePath y description
        // le pasa por parametro el ingrediente que trae en el for que contiene esta funcion.
        // le pone null, como valor predeterminado y required
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          // valida numeros positivos
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  // inicializa el formulario
  private initForm() {
    // los inicializa sin valor
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    // inicializa el array vacio porque no tiene datos por defecto
    let recipeIngredients = new FormArray([]);

    // si editMode es true osea si esta editandose un item
    if (this.editMode) {
      // crea una constante recipe y le pasa el metodo getRecipe de recipeService y le pasa el id en el parametro
      const recipe = this.recipeService.getRecipe(this.id)
      // le asigna el nombre del item que trae con id arriba.
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      // tiene que checkear si tiene datos el array, porque en teoria deberia poder crear una receta sin datos en los campos.
      // si tiene ingredientes
      if (recipe['ingredients']) {
        // recorre todos los campos
        for (let ingredient of recipe.ingredients) {
          // agrega los datos en recipeIngredients, el array vacio creado arriba.
          recipeIngredients.push(
            // no pushea ingredients, pushea FormGroup.
            new FormGroup({
              // y dentro de FormGroup crea FormControl y se lo pasa a name, imagePath y description
              // le pasa por parametro el ingrediente que trae en el for que contiene esta funcion.
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                // valida numeros positivos
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    /* instancia FormGroup que es el contenedor donde van los campos del formulario y crea un objeto */
    this.recipeForm = new FormGroup({
      // si editMode es true le pasa el nombre del item que trae del servicio y se lo pasa a name
      // importa Validators arriba y puede usarlo como segundo parametro.
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      // los ingrediente nombre y cantidad, los trae gracias al for que hace en el initForm()
      'ingredients': recipeIngredients
    });
  }
}
