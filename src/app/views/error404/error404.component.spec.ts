import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';

import { Error404Component } from './error404.component';

describe('Error404Component', () => {
  let component: Error404Component;
  let fixture: ComponentFixture<Error404Component>;
  let routerServiceSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerServiceSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [ Error404Component ],
      imports: [AppModule],
      providers: [
        {provide: Router, useValue: routerServiceSpy}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Error404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`... #${Error404Component.prototype.getRoute.name} deve retornar formulário válido quando email e senha do usuário for válido`, () => {
    //Arrange
    localStorage.setItem('companyId', '1');
    localStorage.setItem('user', 'contato@agroleonidas.com');

    //Act
    component.getRoute();

    //Assert
    expect(routerServiceSpy.navigate).toHaveBeenCalledTimes(1);
  });
});
