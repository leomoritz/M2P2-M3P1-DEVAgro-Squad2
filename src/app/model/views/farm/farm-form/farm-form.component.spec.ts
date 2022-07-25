import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { AppModule } from 'src/app/app.module';

import { FarmFormComponent } from './farm-form.component';

describe('FarmFormComponent', () => {
  let component: FarmFormComponent;
  let fixture: ComponentFixture<FarmFormComponent>;
  let formGroup: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmFormComponent],
      imports: [AppModule],
      providers: [HttpClient],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formGroup = component.getFormConfiguration();
    formGroup.setValue({
      name: 'Fazenda Blumenau',
      address: 'Rua São José',
      grainId: '1',
      lastHarvest: '2022-04-25',
      stock: '2000',
    });
  });

  //Função de teste
  it(`... #${FarmFormComponent.prototype.getFormConfiguration.name} deve retornar um FormGroup válido quando invocado`, () => {
    //Validações
    expect(formGroup.get('name')).toBeTruthy();
    expect(formGroup.get('address')).toBeTruthy();
    expect(formGroup.get('grainId')).toBeTruthy();
    expect(formGroup.get('lastHarvest')).toBeTruthy();
    expect(formGroup.get('stock')).toBeTruthy();
  });

  it(`... #${FarmFormComponent.prototype.getFormConfiguration.name} deve retornar formulário inválido quando um campo obrigatório for nulo`, () => {
    //Regra de negócio
    formGroup.get('name')?.setValue(null);

    //Validações
    expect(formGroup.get('name')?.errors?.['required']).toBeTruthy();
    expect(formGroup.status).toEqual('INVALID');
  });

  it(`... #${FarmFormComponent.prototype.getFormConfiguration.name} deve retornar formulário válido quando dados da empresa forem válidos`, () => {
    //Validações
    expect(formGroup.get('name')?.errors).toBeFalsy();
    expect(formGroup.get('address')?.errors).toBeFalsy();
    expect(formGroup.get('grainId')?.errors).toBeFalsy();
    expect(formGroup.get('lastHarvest')?.errors).toBeFalsy();
    expect(formGroup.get('stock')?.errors).toBeFalsy();
    expect(formGroup.status).toEqual('VALID');
  });
});
