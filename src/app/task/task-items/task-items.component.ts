import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { TaskModel } from '../../../Interfaces/TaskModel';
import { TaskActions } from '../../../Interfaces/TaskActions';
import { TaskActionsEnums } from '../../../enums/TaskActionsEnums';
import {MatListModule} from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';


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

  onHandleDeletedTask($event: number) {
    this.selectedTask = this.taskItems.find((x) => x.taskId == $event);
    this.ActionOnTask.emit({taskId : this.selectedTask.taskId, action: TaskActionsEnums.DELETED});
  }
  onHandleCompletedTask(taskId: number) {
    this.selectedTask = this.taskItems.find((x) => x.taskId == taskId);
    this.ActionOnTask.emit({taskId : this.selectedTask.taskId, action: TaskActionsEnums.COMPLETED});
  } 
}
