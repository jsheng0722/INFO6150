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
  
  currentPage: number = 1;
  totalPages: number = 10;
  isLoading: boolean = false;

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

  async loadTasks() {
    try {
      this.isLoading = true;
      const response = await this.globaltaskService.getTasksSlow(1, 10);
  
      if (response) {
        this.totalPages = response.totalPages;
        this.tasks = response.tasks;
      }
    } catch (error) {
      console.error('Error loading initial tasks:', error);
    } finally {
      this.isLoading = false;
    }
  }
  

  async loadMoreTasks() {
    if (this.currentPage >= this.totalPages) {
      return;
    }
  
    if (this.isLoading) {
      return;
    }
  
    this.isLoading = true;
    this.currentPage++;
  
    try {
      const response = await this.globaltaskService.getTasksSlow(this.currentPage, 10);
  
      if (response) {
        this.totalPages = response.totalPages;
        this.tasks = [...this.tasks, ...response.tasks];
      }
    } catch (error) {
      console.error('Error loading more tasks:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
