import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  /* inyecta el servicio AuthService y lo importa arriba */
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  /* cuando hace submit en signup.component.html en el metodo onSignup le pasa la referencia f, que es lo que tiene el formulario
  onSignup crea form del tipo NgForm, de debe importar arriba  */
  onSignup(form: NgForm) {
    /* crea constante email y le pasa el valor de email del formulario */
    const email = form.value.email;
    const password = form.value.password;
    /* le pasa a signupUser email y password */
    this.authService.signupUser(email, password);
  }

}
