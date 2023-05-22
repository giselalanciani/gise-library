import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksV2Component } from './books-v2.component';

describe('BooksV2Component', () => {
  let component: BooksV2Component;
  let fixture: ComponentFixture<BooksV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
