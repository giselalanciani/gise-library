import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DeleteBookDialog } from '../books/books.component';
import { IBook } from '../models';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books-v3',
  templateUrl: './books-v3.component.html',
  styleUrls: ['./books-v3.component.scss'],
})
export class BooksV3Component implements OnInit, OnDestroy {
  bookList$: Observable<IBook[]>;
  bookList: IBook[] = [];
  filteredBookList: IBook[] = [];
  bookListSubscription!: Subscription;
  removeBookSubscription!: Subscription;

  sortState: { column: string; order: 'asc' | 'desc' } = {
    column: '',
    order: 'desc',
  };

  dialogDeleteSubscription!: Subscription;
  constructor(
    public booksServices: BooksService,
    public dialogService: MatDialog,
    private activatedRouteService: ActivatedRoute
  ) {
    this.bookList$ = this.booksServices.getBooks();
  }
  ngOnInit(): void {
    this.bookListSubscription = this.activatedRouteService.data.subscribe(
      (data) => {
        this.bookList = data['booksList'];
        this.filteredBookList = data['booksList'];
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredBookList = this.bookList.filter((book) => {
      const stockString = book.stock.toString().toLowerCase();
      const priceString = book.price.toString().toLowerCase();
      return (
        book.name.toLowerCase().includes(filterValue) ||
        book.author.toLowerCase().includes(filterValue) ||
        stockString.includes(filterValue) ||
        priceString.includes(filterValue)
      );
    });
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
      case 'author':
        this.sortState = {
          column: 'author',
          order: this.sortState.order === 'desc' ? 'asc' : 'desc',
        };
        this.sortByPropertyAuthor(this.sortState.order);
        break;
      case 'price':
        this.sortState = {
          column: 'price',
          order: this.sortState.order === 'desc' ? 'asc' : 'desc',
        };
        this.sortByPropertyPrice(this.sortState.order);
        break;
      case 'stock':
        this.sortState = {
          column: 'stock',
          order: this.sortState.order === 'desc' ? 'asc' : 'desc',
        };
        this.sortByPropertyStock(this.sortState.order);
        break;
      default:
        break;
    }
  }

  sortByPropertyName(order: 'asc' | 'desc') {
    this.filteredBookList.sort((a, b) =>
      order === 'asc'
        ? a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        : b.name.toLowerCase().localeCompare(a.name.toLowerCase())
    );
  }

  sortByPropertyAuthor(order: 'asc' | 'desc') {
    this.filteredBookList.sort((a, b) =>
      order === 'asc'
        ? a.author.toLowerCase().localeCompare(b.author.toLowerCase())
        : b.author.toLowerCase().localeCompare(a.author.toLowerCase())
    );
  }

  sortByPropertyPrice(order: 'asc' | 'desc') {
    this.filteredBookList.sort((a, b) =>
      order === 'asc' ? a.price - b.price : b.price - a.price
    );
  }

  sortByPropertyStock(order: 'asc' | 'desc') {
    this.filteredBookList.sort((a, b) =>
      order === 'asc' ? a.stock - b.stock : b.stock - a.stock
    );
  }

  ngOnDestroy(): void {
    this.bookListSubscription.unsubscribe();
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
                    this.filteredBookList = books;
                  }
                );
              });
          }
        }
      });
  }
}
