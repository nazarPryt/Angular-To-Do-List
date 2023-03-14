import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'todo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(`[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$`)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    rememberMe: new FormControl(false),
  });

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onLoginSubmit() {
    const value = this.loginForm.value;
    this.authService.login(value);
  }
}
