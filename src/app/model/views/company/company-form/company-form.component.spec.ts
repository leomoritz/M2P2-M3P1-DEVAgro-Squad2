import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, Validators } from '@angular/forms';
import { AppModule } from 'src/app/app.module';

import { CompanyFormComponent } from './company-form.component';

describe('CompanyFormComponent', () => {
  let component: CompanyFormComponent;
  let fixture: ComponentFixture<CompanyFormComponent>;
  let formGroup: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyFormComponent ],
      imports: [AppModule],
      providers: [HttpClient]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formGroup = component.getFormConfiguration();
    formGroup.setValue(
      {
        name: 'Fazenda Blumenau',
        cnpj: '71983502000128',
        address: 'Rua São José',
        email: 'contato@agroblumenau.com',
        password: 'AgroBlu@123',
        confirmPassword: 'AgroBlu@123'
      }
    )
  });

  //Função de teste
  it(`... #${CompanyFormComponent.prototype.getFormConfiguration.name} deve retornar um FormGroup válido quando invocado`, () => {
    //Validações
    expect(formGroup.get('name')).toBeTruthy();
    expect(formGroup.get('cnpj')).toBeTruthy();
    expect(formGroup.get('address')).toBeTruthy();
    expect(formGroup.get('email')).toBeTruthy();
    expect(formGroup.get('password')).toBeTruthy();
    expect(formGroup.get('confirmPassword')).toBeTruthy();

    expect(formGroup.get('name')?.hasValidator(Validators.required)).toBeTruthy();
    expect(formGroup.get('cnpj')?.hasValidator(Validators.required)).toBeTruthy();
    expect(formGroup.get('address')?.hasValidator(Validators.required)).toBeTruthy();
    expect(formGroup.get('email')?.hasValidator(Validators.required)).toBeTruthy();
    expect(formGroup.get('password')?.hasValidator(Validators.required)).toBeTruthy();
    expect(formGroup.get('confirmPassword')?.hasValidator(Validators.required)).toBeTruthy();
  });

  //Função de teste
  it(`... #${CompanyFormComponent.prototype.getFormConfiguration.name} deve retornar formulário inválido quando um dos validadores for violado`, () => {

    //Arrange
    formGroup.get('email')?.setValue('contato');

    //Validações
    expect(formGroup.get('email')?.errors?.['pattern']).toBeTruthy();
    expect(formGroup.status).toEqual('INVALID');
  });

   //Testes

   it(`... #${CompanyFormComponent.prototype.getFormConfiguration.name} deve retornar formulário inválido quando um campo obrigatório for nulo`, () => {
    //Regra de negócio
    formGroup.get('name')?.setValue(null);

    //Validações
     expect(formGroup.get('name')?.errors?.['required']).toBeTruthy();
    expect(formGroup.status).toEqual('INVALID');
  });

   it(`... #${CompanyFormComponent.prototype.getFormConfiguration.name} deve retornar formulário válido quando dados da empresa forem válidos`, () => {
    //Validações
    expect(formGroup.get('name')?.errors).toBeFalsy();
    expect(formGroup.get('cnpj')?.errors).toBeFalsy();
    expect(formGroup.get('address')?.errors).toBeFalsy();
    expect(formGroup.get('email')?.errors).toBeFalsy();
    expect(formGroup.get('password')?.errors).toBeFalsy();
    expect(formGroup.get('confirmPassword')?.errors).toBeFalsy();
    expect(formGroup.status).toEqual('VALID');
  });

  it(`... #${CompanyFormComponent.prototype.createNewCompany.name} deve retornar uma empresa quando dados da empresa forem válidos`, () => {
    component.name.setValue('Fazenda Blumenau');
    component.cnpj.setValue('71983502000128');
    component.address.setValue('Rua São José');
    component.email.setValue('contato@agroblumenau.com');
    component.password.setValue('AgroBlu@123');
    component.confirmPassword.setValue('AgroBlu@123');

    //Act
    let company = component.createNewCompany();

    //Validações
    expect(company).not.toBeNull();
  });

});
