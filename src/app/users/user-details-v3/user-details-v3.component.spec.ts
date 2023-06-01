import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponentV3 } from './user-details-v3.component';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponentV3;
  let fixture: ComponentFixture<UserDetailsComponentV3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailsComponentV3 ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponentV3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
