import { TestBed } from '@angular/core/testing';

import { AuthorDetailsV3Resolver } from './author-details-v3.resolver';

describe('AuthorDetailsV3Resolver', () => {
  let resolver: AuthorDetailsV3Resolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AuthorDetailsV3Resolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
