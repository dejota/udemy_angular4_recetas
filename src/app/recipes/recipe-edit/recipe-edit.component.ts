import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  // es para que cuando esta creando una nueva receta, no esta en modo de edicion.
  editMode = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          // si en la url tiene id editMode pasa a true, si no tiene id queda en false.
          this.editMode = params['id'] != null;
          console.log(this.editMode);
        }
      )
      //console.log(this.id);
  }


}
