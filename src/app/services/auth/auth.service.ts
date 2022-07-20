
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';
import { GrainService } from '../grain/grain.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router,
    private employeeService: EmployeeService,
    private grainService: GrainService) { }

  isLogged() {
    if (localStorage.getItem('user') != null) {
      return true;
    }

    this.route.navigate(['/login']);
    return false;
  }

  async isEmployeeFromCompany(id: string) {
    let employeeExists: boolean = false;

    await this.employeeService.getEmployeeFromCompany(id).then(
      (res: any) => res != null ? employeeExists = true : employeeExists = false
    );
    this.employeeService.getEmployeeFromCompany(id);


    if (employeeExists == false) {
      this.route.navigate(['employee/list'])
      return false;
    }

    return true;
  }

  async isGrainFromCompany(id: string) {
    let grainExists: boolean = false;

    await this.grainService.getGrainFromCompany(id).then(
      (res: any) => res != null ? grainExists = true : grainExists = false
    );
    this.grainService.getGrainFromCompany(id);

    if (grainExists == false) {
      this.route.navigate(['grain/list'])
      return false;
    }

    return true;
  }
}
