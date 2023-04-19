import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private returnUrl!: string;
  loginForm: FormGroup= new FormGroup({});
  
  adminloginForm: FormGroup= new FormGroup({});
  errorMessage: string | null = null;
  isAdminLogin:boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private adminService:AdminService) {}
  
  goBack() {
    this.router.navigate(['/']);
  }
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.adminloginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  toggleLoginMode(){
    this.isAdminLogin = !this.isAdminLogin;
  }

  onAdminLoginSubmit(): void{
    if (this.adminloginForm.valid) {
      const username = this.adminloginForm.get('username')?.value;
      const password = this.adminloginForm.get('password')?.value;
  
      this.adminService.login(username, password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          localStorage.setItem('admin_token', response.adminToken);
          localStorage.setItem('username', "admin");
  
          this.adminService.setUsername("admin");

          this.returnUrl = this.adminService.getReturnUrl() || '';
          this.adminService.setReturnUrl('');
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (error) => {
          console.log('Login failed:', error);
          this.errorMessage = 'Login failed, Please check your email and password.';
        },
        complete: () => {
          console.log('Complete');
        }
    });
    } else {
      console.log('From invalid');
    }
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
  
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          localStorage.setItem('user_token', response.uesrToken);
          localStorage.setItem('username', response.user.username);
  
          this.authService.setUsername(response.user.username);

          this.returnUrl = this.authService.getReturnUrl() || '';
          this.authService.setReturnUrl('');
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (error) => {
          console.log('Login failed:', error);
          this.errorMessage = 'Login failed, Please check your email and password.';
        },
        complete: () => {
          console.log('Complete');
        }
    });
    } else {
      console.log('From invalid');
    }
  }
}
