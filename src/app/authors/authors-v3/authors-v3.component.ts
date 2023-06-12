import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DeleteAuthorDialog } from '../authors/authors.component';
import { IAuthors } from '../models';
import { AuthorsService } from '../services/authors.service';

@Component({
  selector: 'app-authors-v3',
  templateUrl: './authors-v3.component.html',
  styleUrls: ['./authors-v3.component.scss'],
})
export class AuthorsV3Component implements OnInit, OnDestroy {
  authorList$: Observable<IAuthors[]>;
  authorList: IAuthors[] = [];
  filteredAuthorList: IAuthors[] = [];
  authorListSubscription!: Subscription;
  removeAuthorSubscription!: Subscription;

  dialogDeleteSubscription!: Subscription;

  sortState: { column: string; order: 'asc' | 'desc' } = {
    column: '',
    order: 'desc',
  };

  constructor(
    public authorsServices: AuthorsService,
    public dialogService: MatDialog,
    private activatedRouteService: ActivatedRoute
  ) {
    this.authorList$ = this.authorsServices.getAuthors();
  }

  ngOnInit(): void {
    this.authorListSubscription = this.activatedRouteService.data.subscribe(
      (data) => {
        this.authorList = data['authorList'];
        this.filteredAuthorList = data['authorList'];
      }
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

      default:
        break;
    }
  }
  sortByPropertyName(order: 'asc' | 'desc') {
    this.filteredAuthorList.sort((a, b) =>
      order === 'asc'
        ? a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        : b.name.toLowerCase().localeCompare(a.name.toLowerCase())
    );
  }
  ngOnDestroy(): void {
    this.authorListSubscription.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredAuthorList = this.authorList.filter((author) =>
      author.name.toLowerCase().includes(filterValue)
    );
  }

  openDeleteDialog(author: IAuthors) {
    const dialogRef = this.dialogService.open(DeleteAuthorDialog, {
      data: author,
    });
    this.dialogDeleteSubscription?.unsubscribe();
    this.dialogDeleteSubscription = dialogRef
      .afterClosed()
      .subscribe((data) => {
        if (data === true) {
          this.removeAuthorSubscription?.unsubscribe();

          if (author.id !== undefined) {
            this.removeAuthorSubscription = this.authorsServices
              .removeAuthor(author.id)
              .subscribe(() => {
                this.authorListSubscription.unsubscribe();
                this.authorListSubscription = this.authorList$.subscribe(
                  (authors) => {
                    this.authorList = authors;
                    this.filteredAuthorList = authors;
                  }
                );
              });
          }
        }
      });
  }
}
