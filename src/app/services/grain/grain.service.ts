import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE } from 'src/environments/environment';
import { Observable, firstValueFrom } from 'rxjs';
import { IGrain } from 'src/app/model/interfaces/grain/grain';
import { IGrainByCompany } from 'src/app/model/interfaces/grain/igrain-by-company';

@Injectable({
  providedIn: 'root'
})
export class GrainService {

  constructor(private http: HttpClient) { }

  getAllGrains() {
    return this.http.get(`${API_BASE}/grain/list`);
  }

  public postGrain(grain: any): Observable<IGrain> {
    return this.http.post<any>(`${API_BASE}/grain`, grain);
  }

  getAllGrainsByCompany(companyId: string | null): Observable<IGrainByCompany[]> {
    return this.http.get<IGrainByCompany[]>(`${API_BASE}/grain/grains-by-company?companyId=${companyId}`);
  }

  async getGrainFromCompany(id: string) {
    let grain = null;

    await firstValueFrom(this.getAllGrainsByCompany(localStorage.getItem('companyId'))).then(
      (res: any) => {
        console.log(res);
        grain = res.find((grain: any) => grain.id == id)
      }
    );

    console.log(grain);

    return grain;
  }


  async getGrainById(id: string) {
    let grain: any;

    await firstValueFrom(this.getAllGrains()).then(
      (res: any) => grain = res.filter((grain: any) => grain.id == id)
    );

    return grain;
  }

  updateGrain(grain: any, id: any) {
    return this.http.put(`${API_BASE}/grain/${id}`, grain);
  }
}
