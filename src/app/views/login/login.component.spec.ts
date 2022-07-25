import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { UserService } from 'src/app/services/user/user.service';
import { LoginComponent } from './login.component';

describe(LoginComponent.name, () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  //Executa antes de cada "it"
  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['verifyUser']);
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [AppModule],
      providers: [
        {provide: UserService, useValue: userServiceSpy}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
  });

  //Função de teste
  it(`... #${LoginComponent.prototype.getFormConfiguration.name} deve retornar um FormGroup válido quando invocado`, () => {
    //Regra de negócio
    let formGroup = component.getFormConfiguration();

    //Validações
    expect(formGroup.get('email')).toBeTruthy();
    expect(formGroup.get('email')?.hasValidator(Validators.email)).toBeTruthy();
    expect(formGroup.get('email')?.hasValidator(Validators.required)).toBeTruthy();
    expect(formGroup.get('password')).toBeTruthy();
    expect(formGroup.get('password')?.hasValidator(Validators.required)).toBeTruthy();
  });

  //Função de teste
  it(`... #${LoginComponent.prototype.getFormConfiguration.name} deve retornar formulário inválido quando apenas email do usuário for inválido`, () => {
    //Regra de negócio
    let formGroup = component.getFormConfiguration();
    formGroup.setValue({email: 'joao', password: 'DevINhouse@123'})

    //Validações
    expect(formGroup.get('email')?.errors?.['email']).toBeTruthy();
    expect(formGroup.get('email')?.errors?.['required']).toBeFalsy();
    expect(formGroup.get('password')?.errors).toBeFalsy();
    expect(formGroup.status).toEqual('INVALID');
  });

   //Testes

   it(`... #${LoginComponent.prototype.getFormConfiguration.name} deve retornar formulário inválido quando apenas campo obrigatório de senha for nulo`, () => {
    //Regra de negócio
    let formGroup = component.getFormConfiguration();
    formGroup.setValue({email: 'joao@gmail.com', password: ''})

    //Validações
    expect(formGroup.get('email')?.errors).toBeFalsy();
    expect(formGroup.get('password')?.errors?.['required']).toBeTruthy();
    expect(formGroup.status).toEqual('INVALID');
  });

   it(`... #${LoginComponent.prototype.getFormConfiguration.name} deve retornar formulário válido quando email e senha do usuário for válido`, () => {
    //Regra de negócio
    let formGroup = component.getFormConfiguration();
    formGroup.setValue({email: 'joao@gmail.com', password: 'DevINhouse@123'})

    //Validações
    expect(formGroup.get('email')?.errors).toBeFalsy();
    expect(formGroup.get('password')?.errors).toBeFalsy();
    expect(formGroup.status).toEqual('VALID');
  });

  it(`... #${LoginComponent.prototype.validateUserLogin.name} login deve ser verdadeiro quando login for bem sucedido`, () => {
    //Arrange
    component.loginFormGroup.patchValue({
      email: "contato@agrorosa.com.br",
      password: "DevINhouse@123"
    });

    userServiceSpy.verifyUser.withArgs(component.email.value, component.password.value).and.resolveTo(true);

    //Act
    component.submit();

    //Assert
    expect(component.loginSuccessful).toBeTrue();
    expect(userServiceSpy.verifyUser).toHaveBeenCalledTimes(1);
  });

  // it(`... #${LoginComponent.prototype.validateUserLogin.name} login deve ser falso quando login for mal sucedido`, fakeAsync(() => {
  //   //Arrange
  //   component.loginFormGroup.patchValue({
  //     email: "contato@agrorosa.com.br",
  //     password: "Agroleo@1"
  //   });

  //   userServiceSpy.verifyUser.withArgs(component.email.value, component.password.value).and.resolveTo(false);

  //   //Act
  //   component.submit();

  //   //Asserts
  //   expect(component.loginSuccessful).toBeFalse();
  //   expect(userServiceSpy.verifyUser).toHaveBeenCalledTimes(1);
  // }));

});
