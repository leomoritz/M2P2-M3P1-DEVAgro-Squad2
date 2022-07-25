import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { EmployeeFormComponent } from './employee-form.component';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let formGroup: FormGroup;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;

  beforeEach(async () => {
    employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['saveEmployee']);
    await TestBed.configureTestingModule({
      declarations: [ EmployeeFormComponent ],
      imports: [AppModule],
      providers: [HttpClient,
      {provide: EmployeeService, useValue: employeeServiceSpy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formGroup = component.getFormConfiguration();
    formGroup.setValue(
      {
        name: 'Henrique Geraldo Fernandes',
        cpf: '84611586014',
        farmId: '1',
        telephoneNumber: '21985869469',
        companyId: '1',
        status: true,
        job: 'Agricultor',
        hiringDate: '2021-02-25',
      }
    )
  });

  //Função de teste
  it(`... #${EmployeeFormComponent.prototype.getFormConfiguration.name} deve retornar um FormGroup válido quando invocado`, () => {
    //Validações
    expect(formGroup.get('name')).toBeTruthy();
    expect(formGroup.get('cpf')).toBeTruthy();
    expect(formGroup.get('farmId')).toBeTruthy();
    expect(formGroup.get('telephoneNumber')).toBeTruthy();
    expect(formGroup.get('companyId')).toBeTruthy();
    expect(formGroup.get('status')).toBeTruthy();
    expect(formGroup.get('job')).toBeTruthy();
    expect(formGroup.get('hiringDate')).toBeTruthy();
  });

  //Função de teste
  it(`... #${EmployeeFormComponent.prototype.getFormConfiguration.name} deve retornar formulário inválido quando um dos validadores for violado`, () => {

    //Arrange
    formGroup.get('cpf')?.setValue('89574');

    //Validações
    expect(formGroup.get('cpf')?.errors?.['pattern']).toBeTruthy();
    expect(formGroup.status).toEqual('INVALID');
  });

   //Testes

   it(`... #${EmployeeFormComponent.prototype.getFormConfiguration.name} deve retornar formulário inválido quando um campo obrigatório for nulo`, () => {
    //Regra de negócio
    formGroup.get('name')?.setValue(null);

    //Validações
     expect(formGroup.get('name')?.errors?.['required']).toBeTruthy();
    expect(formGroup.status).toEqual('INVALID');
  });

   it(`... #${EmployeeFormComponent.prototype.getFormConfiguration.name} deve retornar formulário válido quando dados do colaborador forem válidos`, () => {
    //Validações
    expect(formGroup.get('name')?.errors).toBeFalsy();
    expect(formGroup.get('cpf')?.errors).toBeFalsy();
    expect(formGroup.get('farmId')?.errors).toBeFalsy();
    expect(formGroup.get('telephoneNumber')?.errors).toBeFalsy();
    expect(formGroup.get('companyId')?.errors).toBeFalsy();
    expect(formGroup.get('status')?.errors).toBeFalsy();
    expect(formGroup.get('job')?.errors).toBeFalsy();
    expect(formGroup.get('hiringDate')?.errors).toBeFalsy();
    expect(formGroup.status).toEqual('VALID');
  });


  it(`... #${EmployeeFormComponent.prototype.saveNewEmployee.name} deve salvar novo colaboradoro quando dados do colaborador forem válidos`, () => {
    //Arrange
    component.name.setValue('Henrique Geraldo Fernandes');
    component.cpf.setValue('84611586014');
    component.farmId.setValue('1');
    component.telephoneNumber.setValue('21985869469');
    component.companyId.setValue('1');
    component.status.setValue(true);
    component.job.setValue('Agricultor');
    component.hiringDate.setValue('2021-02-25');

    const employee = component.createNewEmployee();

    employeeServiceSpy.saveEmployee.withArgs(employee).and.returnValue(of(employee));

    //Act
    component.saveNewEmployee();

    //Validações
    expect(employeeServiceSpy.saveEmployee).toHaveBeenCalledTimes(1);

  });
});
