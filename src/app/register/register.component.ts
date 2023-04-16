import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup= new FormGroup({});
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validators: [this.passwordMatchValidator],
    });
  }
  

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;
      const username = this.registerForm.get('username')?.value;
  
      this.authService.register(email, password, username).subscribe({
        next: (response) => {
          console.log('Register successful:', response);
          alert('Register successful, please login in');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log('Register failed:', error);
          this.errorMessage = 'Register failed, please check your information and try again.';
        },
        complete: () => {
          console.log('Complete');
        }
      });
    } else {
      console.log('Form invalid');
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
