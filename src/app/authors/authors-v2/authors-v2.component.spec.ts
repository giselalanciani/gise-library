import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsV2Component } from './authors-v2.component';

describe('AuthorsV2Component', () => {
  let component: AuthorsV2Component;
  let fixture: ComponentFixture<AuthorsV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorsV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorsV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
