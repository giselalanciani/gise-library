import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IBook } from '../models';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit, OnDestroy {
  bookList$: Observable<IBook[]>;
  bookList = new MatTableDataSource<IBook>([]);
  bookListSubscription!: Subscription;

  removeBookSubscription!: Subscription;

  dialogDeleteSubscription!: Subscription;

  columnsToDisplay = ['name', 'author', 'stock', 'price', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public booksServices: BooksService,
    private route: ActivatedRoute,
    public dialogService: MatDialog
  ) {
    this.bookList$ = this.booksServices.getBooks();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.bookList.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.bookListSubscription = this.bookList$.subscribe((books) => {
      this.bookList.data = books;
    });
  }
  ngAfterViewInit() {
    this.bookList.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.bookListSubscription.unsubscribe();
    this.removeBookSubscription?.unsubscribe();
    this.dialogDeleteSubscription?.unsubscribe();
  }

  openDeleteDialog(book: IBook) {
    const dialogRef = this.dialogService.open(DeleteBookDialog, { data: book });

    this.dialogDeleteSubscription?.unsubscribe();
    this.dialogDeleteSubscription = dialogRef
      .afterClosed()
      .subscribe((data) => {
        if (data === true) {
          this.removeBookSubscription?.unsubscribe();

          if (book.id !== undefined) {
            this.removeBookSubscription = this.booksServices
              .removeBook(book.id)
              .subscribe(() => {
                this.bookListSubscription.unsubscribe();
                this.bookListSubscription = this.bookList$.subscribe(
                  (books) => {
                    this.bookList.data = books;
                  }
                );
              });
          }
        }
      });
  }
}

@Component({
  selector: 'delete-book-dialog',
  templateUrl: './delete-book-dialog.html',
})
export class DeleteBookDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IBook) {}
}
