import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  bookList: IBook[] = [];
  bookListSubscription!: Subscription;

  removeBookSubscription!: Subscription;

  dialogDeleteSubscription! : Subscription;

  columnsToDisplay = ['name', 'author', 'stock', 'price', 'actions'];


  constructor(
    public booksServices: BooksService,
    private route: ActivatedRoute,
    public dialogService: MatDialog
  ) {
    this.bookList$ = this.booksServices.getBooks();
  }

  ngOnInit(): void {
    this.bookListSubscription = this.bookList$.subscribe((books) => {
      this.bookList = books;
    });
  }

  ngOnDestroy(): void {
    this.bookListSubscription.unsubscribe();
    this.removeBookSubscription?.unsubscribe();
    this.dialogDeleteSubscription?.unsubscribe();
  }

  openDeleteDialog(book: IBook) {
    const dialogRef = this.dialogService.open(DeleteBookDialog, { data: book });

    this.dialogDeleteSubscription?.unsubscribe();
    this.dialogDeleteSubscription = dialogRef.afterClosed().subscribe((data) => {
      if (data === true) {
        this.removeBookSubscription?.unsubscribe();

        if (book.id !== undefined) {
          this.removeBookSubscription = this.booksServices
            .removeBook(book.id)
            .subscribe(() => {
              this.bookListSubscription.unsubscribe();
              this.bookListSubscription = this.bookList$.subscribe((books) => {
                this.bookList = books;
              });
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
