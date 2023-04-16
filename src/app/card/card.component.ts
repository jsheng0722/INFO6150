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

  ngOnInit(): void {
    if (this.title && this.title.length > this.maxTitleLength) {
      this.isTitleFull = true;
    }
  }
}
