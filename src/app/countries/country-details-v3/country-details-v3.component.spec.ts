import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDetailsComponentV3 } from './country-details-v3.component';

describe('CountryDetailsComponent', () => {
  let component: CountryDetailsComponentV3;
  let fixture: ComponentFixture<CountryDetailsComponentV3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryDetailsComponentV3 ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryDetailsComponentV3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
