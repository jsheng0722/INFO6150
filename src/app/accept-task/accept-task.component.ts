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
  isExist: boolean = false;
  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<AcceptTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){}
  
  ngOnInit(): void {
    this.task = this.data.task;
    console.log(this.task)
  }
  
  acceptTask() {
    // Check if task already exists
    this.taskService.getTaskById(this.task.md).subscribe({
      next: () => {
        // Task already exists
        this.isExist = true;
        console.log("fail");
        window.alert('Task already exist.');
        this.dialogRef.close();
      },
      error: () => {
        // Task does not exist
        console.log("succ");
        this.isExist = false;
  
        // Add the task
        this.task._id = this.task.md;
        this.taskService.addTask(this.task).subscribe({
          next: () => {
            window.alert('Add successful.');
            this.dialogRef.close();
          },
          error: (error) => {
            console.log('Error while creating task:', error);
          }
        });
      }
    });
  }
  
    
  clicked():boolean{
    if (this.task._id === this.task.md){
      return true;
    }else{
      return false;
    }
  }


  Oncancel(){
    this.dialogRef.close();
  }
}
