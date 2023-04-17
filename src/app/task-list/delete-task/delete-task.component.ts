import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../task.service';
import { GlobaltaskService } from '../../globaltask.service';
import { AuthService} from '../../auth.service'

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent {
  task: any;
  userName: String;

  constructor(
    private taskService: TaskService,
    private globaltaskService: GlobaltaskService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
) {
  this.task = data.task;
  this.userName = this.authService.getUsername();
  // console.log(this.userName)
}

  deleteTask(): void {
    this.taskService.deleteTask(this.task._id).subscribe(
      {
        next: () => {
          window.alert(`Task with id ${this.task._id} deleted.`);
        }
      });
  }

  deleteGlobalTask() :void{
    this.globaltaskService.deleteGlobalTask(this.task._id).subscribe({
      next: () => {
        console.log(`Task in global with id ${this.task._id} deleted.`);
      }
    });
  }
  
  onDelete(): void {
    // if have right
    if (this.task.publisher === this.userName){
      this.globaltaskService.getTaskByMd(this.task._id).subscribe( {
        // find id in global
        next: (task) => {
            this.deleteGlobalTask();
            this.deleteTask();
            this.dialogRef.close();
        },
        // task not on global
        error: ()=>{
          this.deleteTask();
          this.dialogRef.close();
        }
      });
    }
    else{
      window.alert('You do not have permission to delete this task');
      this.dialogRef.close();
    }
    
  }
  

  cancel(): void {
    this.dialogRef.close();
  }
}
