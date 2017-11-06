import { Component, OnInit } from '@angular/core';

/* importa todo del paquete de firebase sdk y le pone alias firebase */
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // crea propiedad para guardar el valor que trae cuando clickea en header html, y lo inicializa con recipe para mostrarlo en la app.
  loadedFeature = 'recipe';

  ngOnInit() {
    /* espera un objeto de javascript como argumento, cuando haga clic en submit de signup ya loguea. */
    firebase.initializeApp({
      /* info conseguida en configuracion web dentro de authentication */
      apiKey: "AIzaSyBhQLEGE9QrHT_pSulV2n2hgst2kPSxdaU",
      authDomain: "udemy-angular-4-ebd6b.firebaseapp.com"
    });
  }

  // aca recibe en el parametro el valor de cuando clickeo en header html
  onNavigate(feature: string) {
    // asigna el valor que trae en loadedFeature.
    this.loadedFeature = feature;
  }
}
