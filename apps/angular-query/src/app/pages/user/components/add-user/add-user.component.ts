import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'angular-query-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  @Output() addUser = new EventEmitter<{ name: string }>();

  public name = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  // @ts-ignore
  public onAddUser(name) {
    this.addUser.emit({ name });
  }
}
