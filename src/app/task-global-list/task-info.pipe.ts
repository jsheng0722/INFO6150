import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskInfo'
})

export class TaskInfoPipe implements PipeTransform {

  transform(task: any): Partial<any> {
    return {
      id: task.id,
      title: task.title,
      assignedTo: task.assignedTo,
      date: task.date
    };
  }
}
