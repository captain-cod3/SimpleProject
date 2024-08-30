import { ChangeDetectionStrategy,Component, EventEmitter, Input, Output } from '@angular/core';
import { type UserModel } from '../../Interfaces/UserModel';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './user.component.html', 
  styleUrl: './user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  @Input() user! : UserModel
  @Output() selectedUserData = new EventEmitter<UserModel>()

  onDisplayUserTasks(event : any) 
  {
    this.selectedUserData.emit(this.user);
  }
}
