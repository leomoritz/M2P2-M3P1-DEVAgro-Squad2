import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IEmployee } from 'src/app/model/interfaces/employee/iemployee';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let employee: IEmployee = {
    id: '1',
    name: 'Funcionario A',
    cpf: '10466816057',
    farmId: '1',
    telephoneNumber: '47992524310',
    companyId: '1',
    status: true,
    job: 'Agricultor',
    hiringDate: '2022-02-25'
  };
  let employees: IEmployee[] = [
  {
    id: '1',
    name: 'Funcionario A',
    cpf: '10466816057',
    farmId: '1',
    telephoneNumber: '47992524310',
    companyId: '1',
    status: true,
    job: 'Agricultor',
    hiringDate: '2022-02-25'
  },
{
  id: '2',
  name: 'Funcionario B',
  cpf: '00372148026',
  farmId: '2',
  telephoneNumber: '47991842365',
  companyId: '1',
  status: true,
  job: 'Agricultor',
  hiringDate: '2015-02-25'
}];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get'])
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    });
    service = TestBed.inject(EmployeeService);
  });

  it(`... #${EmployeeService.prototype.getAllEmployeesByCompany.name} deve retornar uma lista de funcionários quando realizada a busca`, () => {
    httpClientSpy.get.and.returnValue(of(employees));
    service.getAllEmployeesByCompany('1').subscribe({
      next: (employeeRes) => {
        expect(employeeRes).toEqual(employees);
      },
      error: () => {},
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it(`... #${EmployeeService.prototype.saveEmployee.name} deve retornar um funcionário quando for salvo com sucesso`, () => {
    httpClientSpy.post.and.returnValue(of(employee));
    service.saveEmployee(employee).subscribe({
      next: (employeeRes) => {
        expect(employeeRes).toEqual(employee);
      },
      error: () => {},
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });

});
