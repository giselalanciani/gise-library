import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDetailsComponentV3 } from './category-details-v3.component';

describe('CategoryDetailsComponent', () => {
  let component: CategoryDetailsComponentV3;
  let fixture: ComponentFixture<CategoryDetailsComponentV3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryDetailsComponentV3],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryDetailsComponentV3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
