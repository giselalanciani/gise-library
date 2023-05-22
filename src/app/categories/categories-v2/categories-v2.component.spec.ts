import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesV2Component } from './categories-v2.component';

describe('CategoriesV2Component', () => {
  let component: CategoriesV2Component;
  let fixture: ComponentFixture<CategoriesV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
