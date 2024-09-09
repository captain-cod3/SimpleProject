import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskItemsComponent } from './task-items/task-items.component';
import { DUMMY_TASKS } from '../../dummy-tasks';
import { UserModel } from '../../Interfaces/UserModel';
import { TaskModel } from '../../Interfaces/TaskModel';
import { TaskActions } from '../../Interfaces/TaskActions';
import { TaskActionsEnums } from '../../enums/TaskActionsEnums';
import { TaskStatus } from '../../enums/TaskStatusEnums';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NewTaskComponent } from '../new-task/new-task.component';
import { TaskService } from './task.service';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskItemsComponent,MatIconModule,MatProgressBarModule, NewTaskComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {
  @Input() user: UserModel | undefined;
  // listOfTasks = DUMMY_TASKS;
  listOfTasks = [];
  itemTobeUpdated : TaskModel | undefined;
  isAddTaskVisible : boolean =  false;
  
  constructor(private taskService : TaskService) {}


  get SelectedUserTasks() {
    return this.taskService.getSelectedUserTaskDetails(this.user?.id);
  }

  openTaskModal(isVisible:boolean){
    this.isAddTaskVisible = isVisible;
    console.log(this.isAddTaskVisible);
  }
  closeTaskModal(isVisible:boolean){
    this.isAddTaskVisible = isVisible;
    console.log(this.isAddTaskVisible);
  }

  // handleAddNewTask(data : TaskModel){
  //   this.taskService.addNewTask(data);
  //   this.closeTaskModal(false);
  // }
}
