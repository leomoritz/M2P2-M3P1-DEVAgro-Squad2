import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IFarm } from 'src/app/model/interfaces/farm/ifarm';
import { FarmService } from './farm.service';

describe('FarmService', () => {
  let service: FarmService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let farm: IFarm = {
  id:  '1',
  name: 'Fazenda Blumenau',
  address: 'Rua Blumenau',
  companyId: '1',
  grainId: '1',
  lastHarvest: '2022-05-22',
  stock: 2000,
  harvested: true
  };

  let farms: IFarm[] = [
    {
      id:  '1',
      name: 'Fazenda Blumenau',
      address: 'Rua Blumenau',
      companyId: '1',
      grainId: '1',
      lastHarvest: '2022-05-22',
      stock: 2000,
      harvested: true
      }
  ];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get'])
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    });
    service = TestBed.inject(FarmService);
  });

  it(`... #${FarmService.prototype.saveFarm.name} deve retornar uma fazenda quando for salvo com sucesso`, () => {
    httpClientSpy.post.and.returnValue(of(farm));
    service.saveFarm(farm).subscribe({
      next: (farmRes) => {
        expect(farmRes).toEqual(farm);
      },
      error: () => {},
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });


});
