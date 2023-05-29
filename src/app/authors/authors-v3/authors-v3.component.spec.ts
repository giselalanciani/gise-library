import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsV3Component } from './authors-v3.component';

describe('AuthorsV3Component', () => {
  let component: AuthorsV3Component;
  let fixture: ComponentFixture<AuthorsV3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorsV3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorsV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
