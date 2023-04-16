import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { TaskService } from '../../task.service';
import { MatDialogRef } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;
  typesSelected!: string[];

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<AddTaskComponent>
    ) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      completed: [false],
      assignee: [''],
      type: this.formBuilder.array([]),
      constraints: [''],
      reward: ['']
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask = {
        id: uuidv4(),
        ...this.taskForm.value,
        createdate: new Date(),
        modifydate: new Date(),
        publisher: localStorage.getItem('username') || '',
        type: this.typesSelected
      };
      this.taskService.addTask(newTask).subscribe({
        next: () => {
          window.alert('Task added successfully:');
          this.taskForm.reset();
          this.dialogRef.close(newTask);
        },
        error: (error) => {
          console.error('Failed to add task:', error);
        }
      });
    }
  }

  onTypesSelected(types: string[]) {
    this.typesSelected = types;
  }

  onCancel() {
    this.dialogRef.close();
  }
}


