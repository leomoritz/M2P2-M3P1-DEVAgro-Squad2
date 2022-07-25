import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { FarmTableComponent } from './farm-table.component';

describe('FarmTableComponent', () => {
  let component: FarmTableComponent;
  let fixture: ComponentFixture<FarmTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmTableComponent ],
      imports: [ AppModule ],
      providers: [ HttpClient ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
