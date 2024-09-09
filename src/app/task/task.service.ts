import { Injectable } from '@angular/core';
import { TaskStatus } from '../../enums/TaskStatusEnums';
import { TaskModel } from '../../Interfaces/TaskModel';
import { TaskActions } from '../../Interfaces/TaskActions';
import { TaskActionsEnums } from '../../enums/TaskActionsEnums';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private DUMMY_TASKS = [
    {
      taskId: 1,
      description: 'Do homework.',
      userId: 1,
      status: TaskStatus.Done,
    },
    {
      taskId: 2,
      description: 'Replace the oven sheets.',
      userId: 1,
      status: TaskStatus.InProgress,
    },
    {
      taskId: 3,
      description: 'Take scooby to walk',
      userId: 1,
      status: TaskStatus.InProgress,
    },
    {
      taskId: 4,
      description: 'Collect from the dryers.',
      userId: 3,
      status: TaskStatus.InProgress,
    },
    {
      taskId: 5,
      description: 'Create meetings for online classes',
      userId: 2,
      status: TaskStatus.InProgress,
    },
  ];

  private listOfTask = this.DUMMY_TASKS;
  private itemTobeUpdated : TaskModel | undefined;

  getSelectedUserTaskDetails(userId?: number) {
    let totalTaskCount = this.listOfTask.filter((x) => x.userId === userId).length;
    let completedTaskCount = this.listOfTask.filter((x) => x.userId === userId && x.status === TaskStatus.Done).length;
    let remainingTaskCount = totalTaskCount - completedTaskCount;
    return {
      totalTask: totalTaskCount,
      completedTask: completedTaskCount,
      remainingTask: remainingTaskCount,
      taskList: this.listOfTask.filter((x) => x.userId === userId),
      isAllTaskCompleted: totalTaskCount - completedTaskCount === 0,
      progressMeter: (completedTaskCount * 100) / totalTaskCount,
    };
  }

  addNewTask(taskData: TaskModel) {
    this.listOfTask.push(taskData);
  }

  updateTask($event : TaskActions) {
    switch (+$event.action) 
    {
        case TaskActionsEnums.COMPLETED: 
        {
          this.itemTobeUpdated = this.listOfTask.find(x=>x.taskId == $event.taskId)
          if(this.itemTobeUpdated)
            this.itemTobeUpdated.status = TaskStatus.Done
        }
        break;
        case TaskActionsEnums.DELETED: {
          this.itemTobeUpdated = this.listOfTask.find(x=>x.taskId == $event.taskId)
          this.listOfTask = this.listOfTask.filter(x=>x.taskId != $event.taskId)
          if(this.itemTobeUpdated)
            this.itemTobeUpdated.status = TaskStatus.Deleted
        }
        break;
        default : break;
    }
  }
}
