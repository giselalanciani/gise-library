import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { DeleteBookDialog } from '../books/books.component';
import { IBook } from '../models';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books-v2',
  templateUrl: './books-v2.component.html',
  styleUrls: ['./books-v2.component.scss'],
})
export class BooksV2Component implements OnInit {
  bookList$: Observable<IBook[]>;
  bookList: IBook[] = [];
  bookListSubscription!: Subscription;
  removeBookSubscription!: Subscription;

  dialogDeleteSubscription!: Subscription;
  constructor(
    public booksServices: BooksService,
    public dialogService: MatDialog
  ) {
    this.bookList$ = this.booksServices.getBooks();
  }
  ngOnInit(): void {
    this.bookListSubscription = this.bookList$.subscribe((books) => {
      this.bookList = books;
    });
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
                    this.bookList = books;
                  }
                );
              });
          }
        }
      });
  }
}


