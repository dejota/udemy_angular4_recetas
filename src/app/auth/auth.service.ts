import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/* importa todo del paquete de firebase sdk y le pone alias firebase */
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  token: string;

  // usar router para poder redireccionar
  constructor(private router: Router) { }

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
        response => {
          // si loguea redirige al home, y este redirige en app-routing.module.ts a /recipes
          this.router.navigate(['/']);
          // si loguea en la respuesta pide el token que devuelve firebase
          firebase.auth().currentUser.getIdToken()
            .then(
              // asigna el token a la var token
              (token: string) => this.token = token
            )
        }
      )
      /* si hay un error lo atrapa y lo muestra en un console.log */
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    // con el metodo signout() se desloguea de firebase
    firebase.auth().signOut();
    // y le pasa el valor nulo a token
    this.token = null;
  }

  getToken() {
    /* respuesta asincronica, porque tiene que checkear que el token sea valido y sino asigna uno nuevo */
    firebase.auth().currentUser.getIdToken()
      .then(
        // asigna el token a la var token
        (token: string) => this.token = token
      )
    return this.token;
  }

  // metodo para saber si esta logueado
  isAuthenticated() {
    // si el token no es nulo, devuelve true
    return this.token != null;
  }
}
