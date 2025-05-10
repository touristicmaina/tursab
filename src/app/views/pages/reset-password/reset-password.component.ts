import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  confirmPasswordReset,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  Auth
} from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

// CoreUI modules
import { ButtonModule, CardModule, FormModule, ColComponent } from '@coreui/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    FormModule,
  ],
})
export class ResetPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  emailForm: FormGroup;
  code: string = '';
  error: string | null = null;
  email: string = '';
  success = false;
  isEmailSent = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: Auth
  ) {
    // Email form
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    // Password reset form
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Get the oobCode from the URL
    this.code = this.route.snapshot.queryParamMap.get('oobCode') ?? '';

    if (this.code) {
      // If the code exists, verify it and show the reset password form
      verifyPasswordResetCode(this.auth, this.code)
        .then((email) => {
          this.email = email; // Store the email associated with the reset code
        })
        .catch((err) => {
          this.error = 'The reset link is invalid or has expired.';
          this.router.navigate(['/login']); // Optionally redirect the user if the link is invalid
        });
    }
  }

  // Submit the email to send the reset link
  async onForgotPasswordSubmit() {
    const email = this.emailForm.value.email;
    console.log('Submitting email:', email); // Debugging email
  
    try {
      await sendPasswordResetEmail(this.auth, email);
      this.isEmailSent = true;
    } catch (err: any) {
      this.error = 'Failed to send reset link: ' + err.message;
    }
  }
  

  // Submit the new password to Firebase
  async onResetPasswordSubmit() {
    const { password, confirmPassword } = this.passwordForm.value;

    if (password !== confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    try {
      // Confirm the reset with the password and code
      await confirmPasswordReset(this.auth, this.code, password);
      this.success = true;
      setTimeout(() => this.router.navigate(['/login']), 2500); // Redirect to login after success
    } catch (err: any) {
      this.error = 'Failed to reset password: ' + err.message;
    }
  }

  // Optional: return to login page after email is sent
  onBackToLogin() {
    this.router.navigate(['/login']);
  }
}
