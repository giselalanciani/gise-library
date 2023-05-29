import { TestBed } from '@angular/core/testing';

import { BooksResolver } from './books.resolver';

describe('BooksV2Resolver', () => {
  let resolver: BooksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BooksResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
