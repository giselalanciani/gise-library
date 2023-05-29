import { TestBed } from '@angular/core/testing';

import { BooksV2Resolver } from './books-v2.resolver';

describe('BooksV2Resolver', () => {
  let resolver: BooksV2Resolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BooksV2Resolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
