import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent {
  imagePath = 'assets/images';
  constructor(public authService:AuthService){}

  ngOnInit() {
    this.authService.setReturnUrl('/about');
  }
}
