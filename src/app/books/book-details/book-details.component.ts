import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { IBook } from '../models';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent {
  public id: number | null = null;
  form: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(5)]],
    author: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    price: ['', [Validators.required]],
  });

  constructor(
    public booksServices: BooksService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    const id = this._route.snapshot.paramMap.get('id')!;
    if (id !== null) {
      console.log('id',id);
      this.id = parseFloat(id);
      console.log('this.id',this.id);

      this.booksServices.getBook(this.id).subscribe((book)=>{
        this.form.controls['name'].setValue(book.name);
        this.form.controls['author'].setValue(book.author)
        this.form.controls['stock'].setValue(book.stock)
        this.form.controls['price'].setValue(book.price)
      })
    }
  }

  onSubmit() {
    if (this.form.valid === true) {
      // IS create
      if (this.id === null) {
        const book: IBook = {
          name: this.form.controls['name'].value,
          author: this.form.controls['author'].value,
          stock: this.form.controls['stock'].value,
          price: this.form.controls['price'].value,
          editorial: 0,
          categories: [],
          year: 0,
        };

        console.log(' usamos el servicio para. Guardar');
        this.booksServices.createBook(book).subscribe(() => {
          console.log('redireccionamos al la pagina de listado.');
          this._snackBar.open('El libro fue guardado', 'ok');
        });
      } else {
        // Is Edit
      }
    } else {
      console.log('No fue valido, el user debe corregir los errors');
    }
  }

  hasFieldError(fieldName: string, validationName: string): boolean {
    return this.form.controls[fieldName].hasError(validationName);
  }
}
