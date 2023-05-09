import { Component, OnDestroy, OnInit } from '@angular/core';
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

  columnsToDisplay = ['name', 'birthdate'];

  constructor(public authorsServices: AuthorsService) {
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

}
