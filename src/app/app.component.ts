import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // crea propiedad para guardar el valor que trae cuando clickea en header html, y lo inicializa con recipe para mostrarlo en la app.
  loadedFeature = 'recipe';

  // aca recibe en el parametro el valor de cuando clickeo en header html
  onNavigate(feature: string) {
    // asigna el valor que trae en loadedFeature.
    this.loadedFeature = feature;
  }
}
