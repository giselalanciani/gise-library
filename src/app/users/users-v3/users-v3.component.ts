import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IUser } from '../models';
import { UsersService } from '../services/users.service';
import { DeleteUserDialog } from '../users/users.component';

@Component({
  selector: 'app-users-v3',
  templateUrl: './users-v3.component.html',
  styleUrls: ['./users-v3.component.scss'],
})
export class UsersV3Component {
  userList$: Observable<IUser[]>;
  userList: IUser[] = [];
  userListSubscription!: Subscription;
  removeUserSubscription!: Subscription;
  dialogDeleteSubscription!: Subscription;

  constructor(
    public userService: UsersService,
    public dialogService: MatDialog,
    private activatedRouteService: ActivatedRoute
  ) {
    this.userList$ = this.userService.getUsers();
  }
  ngOnInit(): void {
    this.userListSubscription = this.activatedRouteService.data.subscribe(
      (data) => {
        this.userList = data['usersList'];
      }
    );
  }

  ngOnDestroy(): void {
    this.userListSubscription.unsubscribe();
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
