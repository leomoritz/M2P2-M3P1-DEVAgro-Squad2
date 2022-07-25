import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { GrainFormComponent } from './grain-form.component';

describe('GrainFormComponent', () => {
  let component: GrainFormComponent;
  let fixture: ComponentFixture<GrainFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrainFormComponent ],
      imports: [AppModule],
      providers: [HttpClient]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
