import { Component, NgModule, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  taskToDelete: any;
  currentPage = 1;
  itemsPerPage = 8;
  completedTasks: any[] = [];
  uncompletedTasks: any[] = [];
  pub: string = '';
  uncompletedTasksCopy: any[] = [];
  showOverlay:boolean = false;
  

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks: any) => {
        this.tasks = tasks;
        this.completedTasks = this.tasks.filter(task => task.completed);
        this.uncompletedTasks = this.tasks.filter(task => !task.completed);
        this.uncompletedTasksCopy = this.uncompletedTasks.slice();
      },
      error: (error) => {
        console.log('Error retrieving tasks:', error);
      }
    });
  }

  openEditDialog(task: any) {
    const taskWithId = { ...task, id: task._id };
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: {task: taskWithId},
      width: '800px',
      disableClose: true,
      autoFocus: false,
      panelClass: 'dialog-centered',
    });
    
    dialogRef.afterClosed().subscribe(() => {
      this.showOverlay = false;
      this.getTasks();
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '800px',
      disableClose: true,
      autoFocus: false,
      panelClass: 'dialog-centered'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.showOverlay = false;
      this.getTasks();
    });
  }

  openDeleteDialog(task: any) {
    this.taskToDelete = task;
    console.log(task);
    const dialogRef = this.dialog.open(DeleteTaskComponent, {
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

  openUploadDialog(task: any) {
    const dialogRef = this.dialog.open(UploadTaskComponent, {
      data: { task },
      width: '400px',
      disableClose: true,
      autoFocus: false,
      panelClass: 'dialog-centered'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.showOverlay = false;
      this.getTasks();
    });
  }

  toggleCompletedStatus(task: any) {
    const completed = !task.completed;
    this.taskService.modifyStatus(task._id, { completed }).subscribe(() => {
      console.log('Task status updated successfully');
      task.completed = completed;
      this.getTasks();
    }, (error) => {
      console.log('Error updating task status:', error);
    });
  }

  toggleTaskList(pub: string): void {
    this.pub = pub;
    this.uncompletedTasks = this.uncompletedTasksCopy;
    if (this.pub === 'me') {
      this.uncompletedTasks = this.uncompletedTasks.filter(task => task.publisher === this.authService.getUsername());
    } else if (this.pub === 'other') {
      this.uncompletedTasks = this.uncompletedTasks.filter(task => task.publisher !== this.authService.getUsername());
    }
  }

  handleButtonClick(buttonType: string, task?: any) {
    
    this.showOverlay = true;
    switch(buttonType) {
      case 'edit':
        this.openEditDialog(task);
        break;
      case 'add':
        this.openAddDialog();
        break;
      case 'delete':
        this.openDeleteDialog(task);
        break;
      case 'upload':
        this.openUploadDialog(task);
        break;
      default:
        console.log('Invalid button type');
    }
  }
}