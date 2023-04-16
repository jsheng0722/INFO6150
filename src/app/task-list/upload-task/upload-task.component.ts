import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobaltaskService } from 'src/app/globaltask.service';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css']
})
export class UploadTaskComponent{
  task: any;

  constructor(
    private globaltaskService: GlobaltaskService,
    private dialogRef: MatDialogRef<UploadTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
) {
  this.task = data.task;
}

  uploadTask(): void {
    this.globaltaskService.uploadTask(this.task).subscribe(() => {
      window.alert(`Task uploaded.`);
      this.dialogRef.close();
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
