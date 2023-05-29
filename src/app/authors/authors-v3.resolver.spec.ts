import { TestBed } from '@angular/core/testing';

import { AuthorsV3Resolver } from './authors-v3.resolver';

describe('AuthorsV3Resolver', () => {
  let resolver: AuthorsV3Resolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AuthorsV3Resolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
