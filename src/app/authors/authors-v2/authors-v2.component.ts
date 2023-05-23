import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { DeleteAuthorDialog } from '../authors/authors.component';
import { IAuthors } from '../models';
import { AuthorsService } from '../services/authors.service';

@Component({
  selector: 'app-authors-v2',
  templateUrl: './authors-v2.component.html',
  styleUrls: ['./authors-v2.component.scss'],
})
export class AuthorsV2Component implements OnInit {
  authorList$: Observable<IAuthors[]>;
  authorList: IAuthors[] = [];
  authorListSubscription!: Subscription;
  removeAuthorSubscription!: Subscription;

  dialogDeleteSubscription!: Subscription;

  constructor(
    public authorsServices: AuthorsService,
    public dialogService: MatDialog
  ) {
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

  openDeleteDialog(author: IAuthors) {
    const dialogRef = this.dialogService.open(DeleteAuthorDialog, {
      data: author,
    });
    this.dialogDeleteSubscription?.unsubscribe();
    this.dialogDeleteSubscription = dialogRef
      .afterClosed()
      .subscribe((data) => {
        if (data === true) {
          this.removeAuthorSubscription?.unsubscribe();

          if (author.id !== undefined) {
            this.removeAuthorSubscription = this.authorsServices
              .removeAuthor(author.id)
              .subscribe(() => {
                this.authorListSubscription.unsubscribe();
                this.authorListSubscription = this.authorList$.subscribe(
                  (author) => {
                    this.authorList = author;
                  }
                );
              });
          }
        }
      });
  }
}
