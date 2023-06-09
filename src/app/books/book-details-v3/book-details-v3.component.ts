import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBook } from '../models';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-details-v3',
  templateUrl: './book-details-v3.component.html',
  styleUrls: ['./book-details-v3.component.scss'],
})
export class BookDetailsComponentV3 implements OnDestroy {
  book: IBook | null = null;

  getBookSubscription!: Subscription;
  editBookSubscription!: Subscription;
  createBookSubscription!: Subscription;

  form: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(5)]],
    author: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    price: ['', [Validators.required]],
  });

  constructor(
    public booksServices: BooksService,
    private activatedRouteService: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.getBookSubscription = this.activatedRouteService.data.subscribe(
      (data) => {
        this.book = data['book'];
        if (this.book !== null) {
          this.form.controls['name'].setValue(this.book.name);
          this.form.controls['author'].setValue(this.book.author);
          this.form.controls['stock'].setValue(this.book.stock);
          this.form.controls['price'].setValue(this.book.price);
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.getBookSubscription?.unsubscribe();
    this.createBookSubscription?.unsubscribe();
    this.editBookSubscription?.unsubscribe();
  }

  onSubmit() {
    if (this.form.valid === true) {
      const book: IBook = {
        name: this.form.controls['name'].value,
        author: this.form.controls['author'].value,
        stock: parseFloat(this.form.controls['stock'].value),
        price: parseFloat(this.form.controls['price'].value),
        editorial: 0,
        categories: [],
        year: 0,
        id: '',
      };

      if (this.book === null) {
        // IS create
        this.createBookSubscription?.unsubscribe();
        this.createBookSubscription = this.booksServices
          .createBook(book)
          .subscribe(() => {
            this._snackBar.open('El libro fue guardado', 'ok');
            this.router.navigate(['books','v3']);
          });
      } else {
        // Is Edit
        this.editBookSubscription?.unsubscribe();
        this.editBookSubscription = this.booksServices
          .editBook(this.book.id, book)
          .subscribe(() => {
            this._snackBar.open('El libro fue actualizado', 'ok');
            this.router.navigate(['books', 'v3']);
          });
      }
    } else {
      console.log('No fue valido, el user debe corregir los errors');
    }
  }

  hasFieldError(fieldName: string, validationName: string): boolean {
    return this.form.controls[fieldName].hasError(validationName);
  }
}
