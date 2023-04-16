import { Component } from '@angular/core';
import { GlobaltaskService } from '../globaltask.service';

@Component({
  selector: 'app-task-global-list',
  templateUrl: './task-global-list.component.html',
  styleUrls: ['./task-global-list.component.css']
})

export class TaskGlobalListComponent {
  tasks: any[] = [];
  completedFilter: boolean = false;
  dateFilter = false;
  searchDate!: string;
  currentPage = 1;
  itemsPerPage = 8;
  
  constructor(private taskService: GlobaltaskService) {
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks: any[]) => {
      this.tasks = tasks;
    });
  }

  getTasksCount() {
    return this.tasks.length;
  }

  filterTasksByDate(): void {
    if (this.searchDate) {
      const date = new Date(this.searchDate);
      this.tasks = this.tasks.filter(task => new Date(task.date) >= date);
    }
  }
}
