import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from '../models';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnDestroy {
  public id: string | null = null;

  getUserSubscription!: Subscription;
  editUserSubscription!: Subscription;
  createUserSubscription!: Subscription;

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    role: ['', [Validators.required]],
  });
  constructor(
    public userServices: UsersService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id !== null) {
      this.getUserSubscription = this.userServices
        .getUser(id)
        .subscribe((user) => {
          this.form.controls['name'].setValue(user.name);
          this.form.controls['email'].setValue(user.email);
          this.form.controls['password'].setValue(user.password);
          this.form.controls['role'].setValue(user.role);
        });
    }
  }
  ngOnDestroy(): void {
    this.getUserSubscription?.unsubscribe();
    this.createUserSubscription?.unsubscribe();
    this.editUserSubscription?.unsubscribe();
  }
  onSubmit() {
    if (this.form.valid === true) {
      const user: IUser = {
        name: this.form.controls['name'].value,
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value,
        role: this.form.controls['role'].value,
      };

      if (this.id === null) {
        this.createUserSubscription?.unsubscribe();
        this.createUserSubscription = this.userServices
          .createUser(user)
          .subscribe(() => {
            this.snackBar.open('El usuario fue guardado', 'ok');
            this.router.navigate(['user']);
          });
      } else {
        this.editUserSubscription?.unsubscribe();
        this.editUserSubscription = this.userServices
          .editUser(this.id, user)
          .subscribe(() => {
            this.snackBar.open('El usuario fue actualizado', 'ok');
            this.router.navigate(['user']);
          });
      }
    }
  }

  hasFieldError(fieldName: string, validationName: string): boolean {
    return this.form.controls[fieldName].hasError(validationName);
  }
}
