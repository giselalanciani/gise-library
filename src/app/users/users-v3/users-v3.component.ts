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
  filteredUserList: IUser[] = [];
  userListSubscription!: Subscription;
  removeUserSubscription!: Subscription;
  dialogDeleteSubscription!: Subscription;

  sortState: { column: string; order: 'asc' | 'desc' } = {
    column: '',
    order: 'desc',
  };

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
        this.filteredUserList = data['usersList'];
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredUserList = this.userList.filter(
      (user) =>
        user.name.toLowerCase().includes(filterValue) ||
        user.email.toLowerCase().includes(filterValue)
    );
  }
  sortTable(event: Event) {
    const element = event.target as HTMLTableCellElement;
    const columnName = element.getAttribute('name');

    switch (columnName) {
      case 'name':
        this.sortState = {
          column: 'name',
          order: this.sortState.order === 'desc' ? 'asc' : 'desc',
        };
        this.sortByPropertyName(this.sortState.order);
        break;
      case 'email':
        this.sortState = {
          column: 'email',
          order: this.sortState.order === 'desc' ? 'asc' : 'desc',
        };
        this.sortByPropertyEmail(this.sortState.order);
        break;
      case 'password':
        this.sortState = {
          column: 'password',
          order: this.sortState.order === 'desc' ? 'asc' : 'desc',
        };
        this.sortByPropertyPassword(this.sortState.order);
        break;
      case 'role':
        this.sortState = {
          column: 'role',
          order: this.sortState.order === 'desc' ? 'asc' : 'desc',
        };
        this.sortByPropertyRole(this.sortState.order);
        break;
      default:
        break;
    }
  }

  sortByPropertyName(order: 'asc' | 'desc') {
    this.filteredUserList.sort((a, b) =>
      order === 'asc'
        ? a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        : b.name.toLowerCase().localeCompare(a.name.toLowerCase())
    );
  }
  sortByPropertyEmail(order: 'asc' | 'desc') {
    this.filteredUserList.sort((a, b) =>
      order === 'asc'
        ? a.email.toLowerCase().localeCompare(b.email.toLowerCase())
        : b.email.toLowerCase().localeCompare(a.email.toLowerCase())
    );
  }
  sortByPropertyPassword(order: 'asc' | 'desc') {
    this.filteredUserList.sort((a, b) =>
      order === 'asc'
        ? a.password.toLowerCase().localeCompare(b.password.toLowerCase())
        : b.password.toLowerCase().localeCompare(a.password.toLowerCase())
    );
  }
  sortByPropertyRole(order: 'asc' | 'desc') {
    this.filteredUserList.sort((a, b) =>
      order === 'asc'
        ? a.role.toLowerCase().localeCompare(b.role.toLowerCase())
        : b.role.toLowerCase().localeCompare(a.role.toLowerCase())
    );
  }

  ngOnDestroy(): void {
    this.userListSubscription.unsubscribe();
  }
  showArrow(column: string, order: 'asc' | 'desc'): boolean {
    return this.sortState.column === column && this.sortState.order === order;
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
                    this.filteredUserList = users;
                  }
                );
              });
          }
        }
      });
  }
}
