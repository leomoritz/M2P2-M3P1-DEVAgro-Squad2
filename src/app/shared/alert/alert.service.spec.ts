import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });
});
