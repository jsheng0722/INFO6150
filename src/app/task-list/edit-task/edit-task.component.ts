import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})

export class EditTaskComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    const task = this.data.task;
    // console.log(task.id)
    this.taskForm = this.formBuilder.group({
      id: [task.id, Validators.required],
      title: [task.title, [Validators.required, Validators.maxLength(50)]],
      description: [task.description, [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      completed: [task.completed],
      publisher: [task.publisher],
      assignee: [task.assignee],
      type: [task.type],
      constraints: [task.constraints],
      reward: [task.reward]
    });
  }
  
  onSubmit(): void {
    if (this.taskForm.valid) {
      const updatedTask: any = this.taskForm.value;
      this.taskService.modifyTask(updatedTask.id, updatedTask).subscribe({
        next: () => {
          window.alert('Task updated successfully:');
          this.taskForm.reset();
          this.dialogRef.close(updatedTask);
        },
        error: (error) => {
          console.error('Failed to update task:', error);
        }
      });
    }
  }

  onCancel(){
    this.dialogRef.close();
  }
}