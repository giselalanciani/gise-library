import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { IUser } from '../models';
import { UsersService } from '../services/users.service';
import { DeleteUserDialog } from '../users/users.component';

@Component({
  selector: 'app-users-v2',
  templateUrl: './users-v2.component.html',
  styleUrls: ['./users-v2.component.scss'],
})
export class UsersV2Component {
  userList$: Observable<IUser[]>;
  userList: IUser[] = [];
  userListSubscription!: Subscription;
  removeUserSubscription!: Subscription;
  dialogDeleteSubscription!: Subscription;

  constructor(
    public userService: UsersService,
    public dialogService: MatDialog
  ) {
    this.userList$ = this.userService.getUsers();
  }
  ngOnInit(): void {
    this.userListSubscription = this.userList$.subscribe((users) => {
      this.userList = users;
    });
  }
  ngOnDestroy(): void {
    this.userListSubscription.unsubscribe();
    this.removeUserSubscription?.unsubscribe();
    this.dialogDeleteSubscription?.unsubscribe();
  }

  openDeleteDialog(user: IUser) {
    const dialogRef = this.dialogService.open(DeleteUserDialog, { data: user });

    this.dialogDeleteSubscription?.unsubscribe();
    this.dialogDeleteSubscription = dialogRef
      .afterClosed()
      .subscribe((data) => {
        if (data === true) {
          this.removeUserSubscription?.unsubscribe();

          if (user.id !== undefined) {
            this.removeUserSubscription = this.userService
              .removeUser(user.id)
              .subscribe(() => {
                this.userListSubscription.unsubscribe();
                this.userListSubscription = this.userList$.subscribe(
                  (users) => {
                    this.userList = users;
                  }
                );
              });
          }
        }
      });
  }
}
