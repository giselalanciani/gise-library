import { TestBed } from '@angular/core/testing';

import { GetBookResolver } from './get-book.resolver';

describe('GetBookResolver', () => {
  let resolver: GetBookResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetBookResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
