import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { UserNavBarComponent } from './user-nav-bar.component';

describe('UserNavBarComponent', () => {
  let component: UserNavBarComponent;
  let fixture: ComponentFixture<UserNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNavBarComponent ],
      imports: [AppModule],
      providers: [ HttpClient ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
