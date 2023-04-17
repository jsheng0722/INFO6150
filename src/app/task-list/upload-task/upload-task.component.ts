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
    this.task.md = this.task._id
    this.globaltaskService.getTaskByMd(this.task.md).subscribe({
      next: ()=>{
        this.delete();
        this.upload();
        this.dialogRef.close();
      },
      error: ()=>{
        window.alert(`Task upload successful.`);
        this.upload();
      }
    })
  }

  delete(): void{
    this.globaltaskService.deleteGlobalTask(this.task._id).subscribe({
      next:()=>{
        window.alert(`Task modified.`);
        console.log("delete then upload again")
      },
      error:()=>{
        console.log("delete failed")
      }
    })
  }

  upload():void{
    this.globaltaskService.uploadTask(this.task).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: ()=>{
        console.log("upload failed");
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
