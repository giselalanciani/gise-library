import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesV3Component } from './countries-v3.component';

describe('CountriesV2Component', () => {
  let component: CountriesV3Component;
  let fixture: ComponentFixture<CountriesV3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesV3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountriesV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
