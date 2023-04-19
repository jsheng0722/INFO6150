import { Component, Inject } from '@angular/core';
import { GlobaltaskService } from '../globaltask.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-global-task',
  templateUrl: './delete-global-task.component.html',
  styleUrls: ['./delete-global-task.component.css']
})
export class DeleteGlobalTaskComponent {
  task: any;

  constructor(
    private globaltaskService: GlobaltaskService,
    private dialogRef: MatDialogRef<DeleteGlobalTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
    ) {
      this.task = data.task;
    }

  deleteTask(): void {
    this.globaltaskService.deleteGlobalTaskById(this.task._id).subscribe(
    {
      next: () => {
        window.alert(`Task with id ${this.task._id} deleted.`);
      }
    });
    
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
