import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
  TextColorDirective
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    FormControlDirective,
    ButtonDirective,
    TextColorDirective,
    IconDirective,
    CommonModule
  ]
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}
  // This method handles the login process                       
// login.component.ts (just the method)
onLogin(form: NgForm) {
  if (form.invalid) return;

  const { email, password } = form.value;

  this.auth.login({ email, password }).subscribe({
    next: () => {
      console.log('Login successful');
      console.log('user login is : ', email)
      this.router.navigate(['/dashboard']);
    },
    error: err => {
      console.error('Login failed', err);
      alert('Login failed: ' + err.message);
    }
  });
}

gotoForgotPassword() {
  console.log(this.router);
  this.router.navigate(['/reset-password']);
}

}
