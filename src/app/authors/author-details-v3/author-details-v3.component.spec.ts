import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorDetailsComponentV3 } from './author-details-v3.component';

describe('AuthorDetailsComponent', () => {
  let component: AuthorDetailsComponentV3;
  let fixture: ComponentFixture<AuthorDetailsComponentV3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorDetailsComponentV3 ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorDetailsComponentV3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
