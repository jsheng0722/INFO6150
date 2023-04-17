import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{  
  @Input()
  id!: string;
  @Input()
  title!: string;
  @Input()
  publisher!: string;
  @Input()
  date!: Date;
  isTitleFull: boolean = false;
  maxTitleLength = 18;


  imagePath = 'assets/images';
  imageBack!: string;
  defaultImagePath = 'assets/images/p1.jpg';

  ngOnInit(): void {
    if (this.title && this.title.length > this.maxTitleLength) {
      this.isTitleFull = true;
    }
    
    // generate random number from 1-40
    const randomImageNumber = Math.floor(Math.random() * 40) + 1;
    // pic route
    this.imageBack = `imageBack (${randomImageNumber})`;
  }
}
