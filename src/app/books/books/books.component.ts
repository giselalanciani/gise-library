import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IBook } from '../models';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit{
  bookList$: Observable<IBook[]>;
  bookList: IBook[] = [];

  columnsToDisplay = ['name', 'author', 'stock', 'price', 'actions'];

  constructor(
    public booksServices: BooksService,
    private route: ActivatedRoute
  ) {
    this.bookList$ = this.booksServices.getBooks();
  }
  ngOnInit(): void {

    this.bookList$.subscribe((books)=>{
      this.bookList = books;
    })

  }

}
