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
  listOfTasks = DUMMY_TASKS;
  itemTobeUpdated : TaskModel | undefined;
  isAddTaskVisible : boolean =  false;
  
  get SelectedUserTasks() {
    let totalTaskCount = this.listOfTasks.filter(x=>x.userId === this.user?.id).length;
    let completedTaskCount = this.listOfTasks.filter(x=>x.userId === this.user?.id && x.status === TaskStatus.Done).length;
    let remainingTaskCount = totalTaskCount - completedTaskCount;
    return {
      totalTask: totalTaskCount,
      completedTask: completedTaskCount,
      remainingTask: remainingTaskCount,
      taskList:  this.listOfTasks.filter(x => x.userId === this.user?.id),
      isAllTaskCompleted : totalTaskCount - completedTaskCount === 0,
      progressMeter : (completedTaskCount*100)/totalTaskCount
    }
  }

 
  handleActionOnTask($event: TaskActions) 
  {
    switch(+$event.action)
    {
      case TaskActionsEnums.COMPLETED: 
      {
        this.itemTobeUpdated = this.listOfTasks.find(x=>x.taskId == $event.taskId)
        if(this.itemTobeUpdated)
          this.itemTobeUpdated.status = TaskStatus.Done
        console.log(this.listOfTasks)
      }
      break;
      case TaskActionsEnums.DELETED: {
        this.itemTobeUpdated = this.listOfTasks.find(x=>x.taskId == $event.taskId)
        this.listOfTasks = this.listOfTasks.filter(x=>x.taskId != $event.taskId)
        if(this.itemTobeUpdated)
          this.itemTobeUpdated.status = TaskStatus.Deleted

        console.log(this.listOfTasks)
      }
      break;
      default : break;
    }
  }

  openTaskModal(isVisible:boolean){
    this.isAddTaskVisible = isVisible;
    console.log(this.isAddTaskVisible);
  }
  closeTaskModal(isVisible:boolean){
    this.isAddTaskVisible = isVisible;
    console.log(this.isAddTaskVisible);
  }

  handleAddNewTask(data : TaskModel){
    this.listOfTasks.push(data);
    this.closeTaskModal(false);
  }
}
