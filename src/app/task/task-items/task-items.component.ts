import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { TaskModel } from '../../../Interfaces/TaskModel';
import { TaskActions } from '../../../Interfaces/TaskActions';
import { TaskActionsEnums } from '../../../enums/TaskActionsEnums';
import {MatListModule} from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-task-items',
  standalone: true,
  imports: [MatCardModule,MatListModule,MatIcon],
  templateUrl: './task-items.component.html',
  styleUrl: './task-items.component.css',
})
export class TaskItemsComponent {
  @Input() taskItems!: TaskModel[];
  @Output() ActionOnTask = new EventEmitter<TaskActions>();
  selectedTask : any;

  private taskService = inject(TaskService);

  onHandleDeletedTask($event: number) {
    this.selectedTask = this.taskItems.find((x) => x.taskId == $event);
    this.taskService.updateTask({taskId : this.selectedTask.taskId, action: TaskActionsEnums.DELETED});
  }
  onHandleCompletedTask(taskId: number) {
    this.selectedTask = this.taskItems.find((x) => x.taskId == taskId);
    this.taskService.updateTask({taskId : this.selectedTask.taskId, action: TaskActionsEnums.COMPLETED});
  } 
}
