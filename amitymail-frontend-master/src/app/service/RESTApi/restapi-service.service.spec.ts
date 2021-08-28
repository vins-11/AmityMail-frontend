import { TestBed } from '@angular/core/testing';

import { RESTApiServiceService } from './restapi-service.service';

describe('RESTApiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RESTApiServiceService = TestBed.get(RESTApiServiceService);
    expect(service).toBeTruthy();
  });
});
