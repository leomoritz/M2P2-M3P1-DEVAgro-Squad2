import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeEditGuard } from './auth/employee/employee-edit.guard';
import { GeneralGuard } from './auth/general.guard';
import { GrainEditGuard } from './auth/grain/grain-edit.guard';
import { HomeComponent } from './components/home/home.component';
import { CompanyFormComponent } from './model/views/company/company-form/company-form.component';
import { EmployeeEditComponent } from './model/views/employee/employee-edit/employee-edit.component';
import { EmployeeFormComponent } from './model/views/employee/employee-form/employee-form.component';
import { EmployeeListComponent } from './model/views/employee/employee-list/employee-list.component';
import { FarmFormComponent } from './model/views/farm/farm-form/farm-form.component';
import { FarmListComponent } from './model/views/farm/farm-list/farm-list.component';
import { GrainEditComponent } from './model/views/grain/grain-edit/grain-edit.component';
import { GrainFormComponent } from './model/views/grain/grain-form/grain-form.component';
import { GrainListComponent } from './model/views/grain/grain-list/grain-list.component';
import { Error404Component } from './views/error404/error404.component';
import { LoginComponent } from './views/login/login.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [GeneralGuard]},
  { path: 'signin', component: CompanyFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'farm/form', component: FarmFormComponent, canActivate: [GeneralGuard] },
  { path: 'farm/list', component: FarmListComponent, canActivate: [GeneralGuard] },
  { path: 'employee/form', component: EmployeeFormComponent, canActivate: [GeneralGuard] },
  { path: 'home', component: HomeComponent, canActivate: [GeneralGuard] },
  { path: 'employee/list', component: EmployeeListComponent, canActivate: [GeneralGuard] },
  { path: 'employee/edit/:id', component: EmployeeEditComponent, canActivate: [EmployeeEditGuard] },
  { path: 'grain/list', component: GrainListComponent, canActivate: [GeneralGuard] },
  { path: 'grain/form', component: GrainFormComponent, canActivate: [GeneralGuard] },
  { path: 'grain/edit/:id', component: GrainEditComponent, canActivate: [GrainEditGuard] },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
