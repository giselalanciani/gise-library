import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { IAuthors } from '../models';
import { AuthorsService } from '../services/authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit, OnDestroy {
  authorList$: Observable<IAuthors[]>;
  authorList: IAuthors[] = [];
  authorListSubscription!: Subscription
  removeAuthorSubscription!: Subscription;

  dialogDeleteSubscription! : Subscription;

  columnsToDisplay = ['name', 'birthdate', 'actions'];


  constructor(public authorsServices: AuthorsService, public dialogService: MatDialog ) {
    this.authorList$ = this.authorsServices.getAuthors();
  }

  ngOnInit(): void {
    this.authorListSubscription = this.authorList$.subscribe((authors) => {
      this.authorList = authors;
    });
  }

  ngOnDestroy(): void {
    this.authorListSubscription.unsubscribe();
  }

  openDeleteDialog(author:IAuthors){
    const dialogRef = this.dialogService.open(DeleteAuthorDialog, { data: author });
    this.dialogDeleteSubscription?.unsubscribe();
    this.dialogDeleteSubscription = dialogRef.afterClosed().subscribe((data) => {
      if (data === true) {
        this.removeAuthorSubscription?.unsubscribe();

        if (author.id !== undefined) {
          this.removeAuthorSubscription = this.authorsServices
            .removeAuthor(author.id)
            .subscribe(() => {
              this.authorListSubscription.unsubscribe();
              this.authorListSubscription = this.authorList$.subscribe((author) => {
                this.authorList = author;
              });
            });
        }
      }
    });

  }




}
@Component({
  selector: 'delete-author-dialog',
  templateUrl: './delete-author-dialog.html',
})
export class DeleteAuthorDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IAuthors) {}
}
