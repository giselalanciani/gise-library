import { TestBed } from '@angular/core/testing';

import { GetCategoryResolver } from './getCategory.resolver';

describe('GetCategoryResolver', () => {
  let resolver: GetCategoryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetCategoryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
