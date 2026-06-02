import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  mensajeError = signal('');

  formularioLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private authService: Auth,
    private router: Router
  ) {
  }

  iniciarSesion(): void {

    this.mensajeError.set('');

    const email = this.formularioLogin.value.email || '';
    const password = this.formularioLogin.value.password || '';

    this.authService.login(email, password).subscribe({
      next: respuesta => {

        if (respuesta.token) {
          this.authService.guardarToken(respuesta.token);
          this.router.navigate(['/home']);
        } else {
          this.mensajeError.set('No se recibió token');
        }

      },
      error: error => {
        this.mensajeError.set('Email o contraseña incorrectos');
        console.error(error);
      }
    });
  }
}