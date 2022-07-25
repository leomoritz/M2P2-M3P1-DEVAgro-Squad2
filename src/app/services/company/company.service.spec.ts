import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ICompany } from 'src/app/model/interfaces/company/icompany';
import { CompanyService } from './company.service';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let company: ICompany = {
    id: '1',
    name: 'Empresa A',
    cnpj: '03733593000193',
    address: 'Rua A',
    email: 'contato@empresaa.com',
    password: 'contatoA@123'
  };
  let companies: ICompany[] = [{
    id: '1',
    name: 'Empresa A',
    cnpj: '03733593000193',
    address: 'Rua A',
    email: 'contato@empresaa.com',
    password: 'contatoA@123'
  },
{
    id: '2',
    name: 'Empresa B',
    cnpj: '23020139000100',
    address: 'Rua B',
    email: 'contato@empresab.com',
    password: 'contatoB@123'
}];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get'])
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    });
    service = TestBed.inject(CompanyService);
  });

  it(`... #${CompanyService.prototype.getAllCompany.name} deve retornar uma lista de empresas quando realizada a busca`, () => {
    httpClientSpy.get.and.returnValue(of(companies));
    service.getAllCompany().subscribe({
      next: (companiesRes) => {
        expect(companiesRes).toEqual(companies);
      },
      error: () => {},
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it(`... #${CompanyService.prototype.saveCompany.name} deve retornar uma empresa quando a empresa for salva com sucesso`, () => {
    httpClientSpy.post.and.returnValue(of(company));
    service.saveCompany(company).subscribe({
      next: (companyRes) => {
        expect(companyRes).toEqual(company);
      },
      error: () => {},
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });

});
