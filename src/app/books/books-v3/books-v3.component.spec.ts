import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksV3Component } from './books-v3.component';

describe('BooksV2Component', () => {
  let component: BooksV3Component;
  let fixture: ComponentFixture<BooksV3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksV3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
