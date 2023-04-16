import { Component, Inject } from '@angular/core';
import { TaskService } from '../task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-accept-task',
  templateUrl: './accept-task.component.html',
  styleUrls: ['./accept-task.component.css']
})
export class AcceptTaskComponent {
  task: any
  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<AcceptTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){}
  
  ngOnInit(): void {
    this.task = this.data.task;
  }
  
  acceptTask() {
    // check if task already exists
    if (this.taskService.checkIfTaskExists(this.task)) {
      window.alert('This task is already in the list.');
      this.dialogRef.close();
    } else {
      this.taskService.addTask(this.task).subscribe({
        next: () => {
          window.alert('This task is already in the list.');
          this.dialogRef.close();
        },
        error: (error) => {
          console.log('Error while creating task:', error);
        }
      });
    }
  }
    
  Oncancel(){
    this.dialogRef.close();
  }
}
