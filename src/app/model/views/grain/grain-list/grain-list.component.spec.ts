import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { GrainListComponent } from './grain-list.component';

describe('GrainListComponent', () => {
  let component: GrainListComponent;
  let fixture: ComponentFixture<GrainListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrainListComponent ],
      imports: [AppModule],
      providers: [HttpClient]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
