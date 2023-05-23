import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesV2Component } from './countries-v2.component';

describe('CountriesV2Component', () => {
  let component: CountriesV2Component;
  let fixture: ComponentFixture<CountriesV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountriesV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
