import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskStatus } from '../../enums/TaskStatusEnums';
import { FormsModule } from '@angular/forms';
import { DUMMY_TASKS } from '../../dummy-tasks';
import { TaskModel } from '../../Interfaces/TaskModel';
import { TaskService } from '../task/task.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input() userId: number | undefined;
  // @Output() handleAddNewTask = new EventEmitter<TaskModel>();

  constructor(private taskService : TaskService) {}

  get GenerateTaskId() {
    let result = DUMMY_TASKS.reduce((prev, curr) =>
      prev.taskId > curr.taskId ? prev : curr
    );
    console.log(result.taskId + 1);
    return result.taskId + 1;
  }
  taskStatusList = [
    { label: TaskStatus[TaskStatus.InProgress], value: TaskStatus.InProgress },
    { label: TaskStatus[TaskStatus.Done], value: TaskStatus.Done },
    { label: TaskStatus[TaskStatus.Deleted], value: TaskStatus.Deleted },
  ];

  taskDescription = '';
  taskStatus: number | undefined;

  formData = {} as TaskModel;

  OnSubmit() {
    if (this.userId !== undefined) {
      this.formData.userId = this.userId;
      this.formData.description = this.taskDescription;
      this.formData.status = +this.taskStatus!;
      this.formData.taskId = this.GenerateTaskId;
      // this.handleAddNewTask.emit(this.formData);
      this.taskService.addNewTask(this.formData);
    }
  }
}
