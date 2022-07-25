import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { FarmListComponent } from './farm-list.component';

describe('FarmListComponent', () => {
  let component: FarmListComponent;
  let fixture: ComponentFixture<FarmListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmListComponent ],
      imports: [AppModule],
      providers: [HttpClient]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
