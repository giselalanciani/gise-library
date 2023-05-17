import { Component, Inject,OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { IUser } from '../models';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  userList$: Observable<IUser[]>;
  userList: IUser[] = [];
  userListSubscription!: Subscription;
  removeUserSubscription!: Subscription;
  dialogDeleteSubscription!: Subscription;

  columnsToDisplay = ['name', 'email', 'password', 'role', 'actions'];

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
    this.dialogDeleteSubscription = dialogRef.afterClosed().subscribe((data) => {
      if (data === true) {
        this.removeUserSubscription?.unsubscribe();

        if (user.id !== undefined) {
          this.removeUserSubscription = this.userService
            .removeUser(user.id)
            .subscribe(() => {
              this.userListSubscription.unsubscribe();
              this.userListSubscription = this.userList$.subscribe((users) => {
                this.userList = users;
              });
            });
        }
      }
    });
  }
}

@Component({
  selector: 'delete-user-dialog',
  templateUrl: './delete-user-dialog.html',
})
export class DeleteUserDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IUser) {}
}

