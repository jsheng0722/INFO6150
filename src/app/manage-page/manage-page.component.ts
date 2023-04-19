import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobaltaskService } from '../globaltask.service';
import { Router } from '@angular/router';
import { DeleteGlobalTaskComponent } from '../delete-global-task/delete-global-task.component';

@Component({
  selector: 'app-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.css']
})
export class ManagePageComponent {
  tasks: any[] = [];
  taskToDelete: any;
  currentPage = 1;
  itemsPerPage = 8;
  showOverlay:boolean = false;
  currentTab: string = 'completed';

  constructor(
    private dialog: MatDialog,
    private globaltaskService: GlobaltaskService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTasks();
  }

  goBack() {
    this.router.navigate(['/globalTask']);
  }

  getTasks() {
    this.globaltaskService.getTasks().subscribe({
      next: (tasks: any) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.log('Error retrieving tasks:', error);
      }
    });
  }

  onRowClick(id : string){
    console.log(id)
  }
  openDeleteDialog(task: any) {
    this.taskToDelete = task;
    console.log(task);
    const dialogRef = this.dialog.open(DeleteGlobalTaskComponent, {
      data: { task },
      width: '400px',
      disableClose: true,
      autoFocus: false,
      panelClass: 'dialog-centered'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.showOverlay = false;
      this.taskToDelete = null;
      this.getTasks();
    });
  }
}
