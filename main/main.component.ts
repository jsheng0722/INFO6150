import { Component } from '@angular/core';
import { GlobaltaskService } from '../globaltask.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  imagePath = 'assets/images';
  searchResults!: any[];
  tasks!: any[];
  searchKw!: string;

  constructor(private globaltaskService : GlobaltaskService){

  }

  ngOnInit(): void {
    this.getGlobalTasks();
  }

  getGlobalTasks() {
    this.globaltaskService.getTasks().subscribe({
      next: (tasks: any) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.log('Error retrieving global tasks:', error);
      }
    });
  }

  searchTasks(searchKeyword: string): void {
    this.globaltaskService.searchTasks(searchKeyword)
    .subscribe((data) => {
      this.searchKw = searchKeyword;
      this.searchResults = data;
    });
  }

}
