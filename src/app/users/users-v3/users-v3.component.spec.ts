import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersV3Component } from './users-v3.component';

describe('UsersV3Component', () => {
  let component: UsersV3Component;
  let fixture: ComponentFixture<UsersV3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersV3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
