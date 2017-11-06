import { Injectable } from '@angular/core';

/* importa todo del paquete de firebase sdk y le pone alias firebase */
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor() { }

  /* espera email y string que trae desde signup.component.html y ts */
  signupUser(email: string, password: string) {
    /* auth() es un metodo que deja acceder a todo lo relacionado con auth
    al resultado del metodo auth le concatena el metodo createUserWithEmailAndPassword
    firebase pide por lo menos 6 caracteres */
    firebase.auth().createUserWithEmailAndPassword(email, password)
      /* si hay un error lo atrapa y lo muestra en un console.log */
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    /* usa signInWithEmailAndPassword para poder loguearse en firebase */
    firebase.auth().signInWithEmailAndPassword(email, password)
      /* con then puede ver lo que trae la respuesta */
      .then(
        response => console.log(response)
      )
      /* si hay un error lo atrapa y lo muestra en un console.log */
      .catch(
        error => console.log(error)
      );
  }
}
