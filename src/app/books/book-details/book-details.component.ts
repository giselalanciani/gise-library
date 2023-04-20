import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent {

  public isEdit = false;
form: any;

  constructor(
    public booksServices: BooksService,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id === null) {
      this.isEdit = false;
    } else {
      console.log('Es edit', parseInt(id));
      this.isEdit = true;
    }

    // this.categories$ = this.categoryService.getCategory(id);
    // this.book$ = this.booksServices.getBooks();
  }


}
