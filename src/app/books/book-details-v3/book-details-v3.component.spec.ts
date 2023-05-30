import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetailsComponent } from '../book-details/book-details.component';

import { BookDetailsComponentV3 } from './book-details-v3.component';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponentV3;
  let fixture: ComponentFixture<BookDetailsComponentV3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDetailsComponentV3 ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDetailsComponentV3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
