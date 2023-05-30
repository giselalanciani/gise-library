import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAuthors } from '../models';
import { AuthorsService } from '../services/authors.service';

@Component({
  selector: 'app-author-details-v3',
  templateUrl: './author-details-v3.component.html',
  styleUrls: ['./author-details-v3.component.scss'],
})
export class AuthorDetailsComponentV3 {
  public id: number | null = null;
  getAuthorSubscription!: Subscription;
  createAuthorSubscription!: Subscription;
  editAuthorSubscription!: Subscription;

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
  });

  constructor(
    public authorService: AuthorsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id !== null) {
      this.id = parseFloat(id);
      this.getAuthorSubscription = this.authorService
        .getAuthor(id)
        .subscribe((author) => {
          this.form.controls['name'].setValue(author.name);
          this.form.controls['birthdate'].setValue(author.birthdate);
        });
    }
  }
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2070, 0, 1);

  ngOnDestroy(): void {
    this.getAuthorSubscription?.unsubscribe();
    this.createAuthorSubscription?.unsubscribe();
    this.editAuthorSubscription?.unsubscribe();
  }

  onSubmit() {
    if (this.form.valid === true) {
      const author: IAuthors = {
        name: this.form.controls['name'].value,
        birthdate: this.form.controls['birthdate'].value,
        id: '',
      };
      if (this.id === null) {
        this.createAuthorSubscription?.unsubscribe();
        this.createAuthorSubscription = this.authorService
          .createAuthor(author)
          .subscribe(() => {
            this.snackBar.open('El author fue guardado', 'ok');
            this.router.navigate(['authors']);
          });
      } else {
        this.editAuthorSubscription?.unsubscribe();
        this.editAuthorSubscription = this.authorService
          .editAuthor(this.id, author)
          .subscribe(() => {
            this.snackBar.open('El author fue actualizado', 'ok');
            this.router.navigate(['authors']);
          });
      }
    }
  }
  hasFieldError(fieldName: string, validationName: string): boolean {
    return this.form.controls[fieldName].hasError(validationName);
  }
}
