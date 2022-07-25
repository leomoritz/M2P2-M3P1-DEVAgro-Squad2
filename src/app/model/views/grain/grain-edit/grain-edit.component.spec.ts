import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { GrainEditComponent } from './grain-edit.component';

describe('GrainEditComponent', () => {
  let component: GrainEditComponent;
  let fixture: ComponentFixture<GrainEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrainEditComponent ],
      imports: [AppModule],
      providers: [HttpClient]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrainEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
