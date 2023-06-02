import { TestBed } from '@angular/core/testing';

import { GetUserResolver } from './getUser.resolver';

describe('GetUserResolver', () => {
  let resolver: GetUserResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetUserResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
