import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';  // Importar Router

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: []
})
export class RegisterPageComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;
      this.authService.register(username, password).subscribe(response => {
        console.log('Usuario registrado con éxito');
        this.router.navigate(['/auth/login']);
      });
    }
  }
}
