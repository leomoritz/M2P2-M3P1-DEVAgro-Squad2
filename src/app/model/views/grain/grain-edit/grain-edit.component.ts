import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlert } from 'src/app/interfaces/alert/ialert';
import { IFarmPut } from 'src/app/model/interfaces/farm/ifarm';
import { IGrainByCompany } from 'src/app/model/interfaces/grain/igrain-by-company';
import { FarmService } from 'src/app/services/farm/farm.service';
import { GrainService } from 'src/app/services/grain/grain.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { DateFormatService } from 'src/app/shared/formatters/date-format.service';
import { ERROR, SUCCESS } from 'src/environments/environment';

@Component({
  selector: 'app-grain-edit',
  templateUrl: './grain-edit.component.html',
  styleUrls: ['./grain-edit.component.css']
})
export class GrainEditComponent implements OnInit {

  menuName: string = 'Editar Grão';
  public grainForm: any = [];
  formSended: boolean = false;
  alertMessage!: IAlert;
  companies: any = [];
  grain: IGrainByCompany = {
    id: '',
    name: '',
    averageHarvestTime: 0,
    company: '',
    nextHarvestDate: '',
    additionalInformation: '',
  };
  grainFarmId: any;
  companyId = localStorage.getItem('companyId');
  farm: any;
  newGrain: any;
  newGrainId: string = '';
  farmProducesId: string = '';

  constructor(
    private rest: GrainService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private farmService: FarmService,
    private route: ActivatedRoute,
    private dateFormatService: DateFormatService,
    private redirectRout: Router) { }

  ngOnInit() {
    this.getAllfarm();
    this.getGrain();
    this.grainForm = this.fb.group({
      name: ['', [Validators.required]],
      companyId: [this.companyId],
      nextHarvestDate: ['', [Validators.required]],
      additionalInformation: [''],
      farmProducesId: [],
    });
    this.getGrainFarm();
  }

  get name(){
    return this.grainForm.get('name')!;
  }

  get nextHarvestDate(){
    return this.grainForm.get('nextHarvestDate')!;
  }

  get additionalInformation(){
    return this.grainForm.get('additionalInformation')!;
  }

  public convertFromStringToDate(date: any): Date {
    return this.dateFormatService.convertFromStringToDate(date);
  }

  public updateGrain() {
    if (this.grainForm.valid) {
      this.setNewGrain();

      try {
        this.rest.updateGrain(this.newGrain, this.grain.id).subscribe({
          next: (v) => this.updateFarmIdgrain(v),
          error: (e) => this.messageErrorPostGrain(),
          complete: () => this.redirectRout.navigate(['grain/list'])
        })
      } catch (error) {
        this.messageErrorPostGrain();
      }
    }
  }

  updateFarmIdgrain(result: any) {
    this.newGrainId = result.id;
    this.farmProducesId = this.grainForm.value.farmProducesId;

    if (this.farmProducesId != null) {
      this.putGrainInFarm();
    } else {
      this.messagePostGrain({ name: 'Just to show the popup' });
    }
  }

  async putGrainInFarm() {
    let getFarmById = await this.getFarmById();
    await this.putFarm(getFarmById);
  }


  putFarm(reponse: any) {
    console.log("Mandou o");

    return new Promise((resolve, reject) => {
      if (reponse.sucess) {
        this.farmService.putFarm(this.farm).subscribe({
          next: (v) => this.messagePostGrain(v),
          error: (e) => this.messageErrorPostGrain(),
        });
      }
    });
  }

  getFarmById() {
    return new Promise((resolve, reject) => {
      try {
        this.farmService.getAllfarm().subscribe((data: any) => {
          this.farm = data.find((farm: IFarmPut) => farm.id == this.farmProducesId);
          this.farm.grainId = this.newGrainId;
          resolve({ sucess: true });
        });

      } catch (error) {
        reject({ sucess: false });
      }

    });
  }

  messagePostGrain(result: any) {
    if (result.name) {
      this.alertMessage = {
        title: '',
        message: 'Grão editado com sucesso!',
        typeAlert: SUCCESS,
      };
      this.alertService.showGenericAlert(this.alertMessage);
      this.grainForm.reset();

    } else {
      this.alertMessage = {
        title: 'Ocorreu um erro ao editar o Grão',
        message: 'Entre em contato com o administrador do sistema.',
        typeAlert: ERROR,
      };
    }
  }

  messageErrorPostGrain() {
    this.alertMessage = {
      title: 'Ocorreu um erro ao editar o Grão',
      message: 'Entre em contato com o administrador do sistema.',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }

  getAllfarm() {
    this.farmService.getAllfarm().subscribe((data: any) => {
      this.companies = data.filter((farm: any) => farm.company.id == this.companyId);
    });
  }

  async getGrain() {
    const grainId = this.route.snapshot.params['id'];

    await this.rest.getGrainById(grainId).then((res: any) => {
      this.grain.id = res[0].id;
      this.grain.name = res[0].name;
      this.grain.averageHarvestTime = res[0].averageHarvestTime;
      this.grain.company = res[0].company;
      this.grain.nextHarvestDate = res[0].nextHarvestDate;
      this.grain.additionalInformation = res[0].additionalInformation;
    });

  }

  getGrainFarm() {
    this.farmService.getAllfarm().subscribe((data: any) => {
      data.forEach((farm: any) => {
        if (farm.grain.id == this.grain.id) {
          this.farm = farm;
          this.grainFarmId = farm.id;
        }
      })
    });
  }

  setNewGrain() {
    this.newGrain = {
      name: this.grainForm.name ? this.grainForm.name : this.grain.name,
      companyId: this.companyId,
      nextHarvestDate: this.grainForm.nextHarvestDate ?
        this.grainForm.nextHarvestDate : this.grain.nextHarvestDate,
      additionalInformation: this.grainForm.additionalInformation ?
        this.grainForm.additionalInformation : this.grain.additionalInformation
    }

  }

}
