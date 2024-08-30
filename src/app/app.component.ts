import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from '../dummy-user';
import { TaskComponent } from './task/task.component';
import { UserModel } from '../Interfaces/UserModel';
import {MatGridListModule} from '@angular/material/grid-list';
import { TaskActionsEnums } from '../enums/TaskActionsEnums';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserComponent, TaskComponent, MatGridListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = 'SimpleProject';
  listOfUsers = DUMMY_USERS;
  selectedUser: UserModel | undefined;

  handleSelectedUserData(user: UserModel) {
    if (user !== undefined) this.selectedUser = user;
  }

  handleUpdateUserTaskCount($event: any)
  {
    switch(+$event.action)
    {
      case TaskActionsEnums.COMPLETED: 
      {
        
      }
      break;
      case TaskActionsEnums.DELETED: {
        
      }
      break;
      case TaskActionsEnums.STARTED: {
        
      }
      break;
      default : {
       
      }
    }
  }

}
