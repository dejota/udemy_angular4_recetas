import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // Output recibe info de otro componente (en este caso lo usa app.component.html), cambiando el comportamiento de encapsulamiento de cada componente, importarlo arriba.
  // crea una propiedad featureSelected y emite el evento al usar new y EventEmitter y le dice que tipo de dato emite.
  @Output() featureSelected = new EventEmitter<string>();

  /* Metodo que llama al hacer clic en header html */
  onSelect(feature: string) {
    // cuando hace click pasa el parametro y lo guarda en el featureSelected
    this.featureSelected.emit(feature);
  }

  constructor() { }

  ngOnInit() {
  }

}
