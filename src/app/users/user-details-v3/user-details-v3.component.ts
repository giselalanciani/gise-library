import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from '../models';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-details-v3',
  templateUrl: './user-details-v3.component.html',
  styleUrls: ['./user-details-v3.component.scss'],
})
export class UserDetailsComponentV3 implements OnDestroy {
  user: IUser | null = null;

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
    private activatedRouteService: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.getUserSubscription = this.activatedRouteService.data.subscribe(
      (data) => {
        this.user = data['user'];
        if (this.user !== null) {
          this.form.controls['name'].setValue(this.user.name);
          this.form.controls['email'].setValue(this.user.email);
          this.form.controls['password'].setValue(this.user.password);
          this.form.controls['role'].setValue(this.user.role);
        }
      }
    );
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
        id: '',
      };

      if (this.user === null) {
        this.createUserSubscription?.unsubscribe();
        this.createUserSubscription = this.userServices
          .createUser(user)
          .subscribe(() => {
            this.snackBar.open('El usuario fue guardado', 'ok');
            this.router.navigate(['users']);
          });
      } else {
        this.editUserSubscription?.unsubscribe();
        this.editUserSubscription = this.userServices
          .editUser(this.user.id!, user)
          .subscribe(() => {
            this.snackBar.open('El usuario fue actualizado', 'ok');
            this.router.navigate(['users']);
          });
      }
    }
  }

  hasFieldError(fieldName: string, validationName: string): boolean {
    return this.form.controls[fieldName].hasError(validationName);
  }
}
