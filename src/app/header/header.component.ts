import { Component, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  imagePath = 'assets/images';
  isLoginFormActive = true;
  isRegisterFormActive = true;
  viewContainerRef: ViewContainerRef | undefined;
  constructor(public dialog: MatDialog) {}

  openLoginForm() {
    this.isRegisterFormActive = false;
    this.isLoginFormActive = true;
    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: true,
      hasBackdrop: true,
      viewContainerRef: this.viewContainerRef
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openRegisterForm() {
    this.isLoginFormActive = false;
    this.isRegisterFormActive = true;
    const dialogRef = this.dialog.open(RegisterFormComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: true,
      hasBackdrop: true,
      viewContainerRef: this.viewContainerRef
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
