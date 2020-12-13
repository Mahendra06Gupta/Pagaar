import { TestBed } from '@angular/core/testing';

import { ErrorHandlerMessageService } from './error-handler-message.service';

describe('ErrorHandlerMessage.Service.TsService', () => {
  let service: ErrorHandlerMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlerMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
