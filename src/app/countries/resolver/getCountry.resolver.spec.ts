import { TestBed } from '@angular/core/testing';

import { GetCountryResolver } from './get-country.resolver';

describe('GetCountryResolver', () => {
  let resolver: GetCountryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetCountryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
