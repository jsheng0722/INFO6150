import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  @Input() tasks: any[] = [];
  @Input() searchKw: string = '';
  
  currentPage = 1;
  itemsPerPage = 20;
  
  constructor(){
  }
}
