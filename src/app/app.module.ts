import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from './components/button/button.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserNavBarComponent } from './components/user-nav-bar/user-nav-bar.component';
import { CompanyFormComponent } from './model/views/company/company-form/company-form.component';
import { EmployeeFormComponent } from './model/views/employee/employee-form/employee-form.component';
import { FarmFormComponent } from './model/views/farm/farm-form/farm-form.component';
import { FarmListComponent } from './model/views/farm/farm-list/farm-list.component';
import { FarmTableComponent } from './components/farm/farm-table/farm-table.component';
import { GrainEditComponent } from './model/views/grain/grain-edit/grain-edit.component';
import { GrainFormComponent } from './model/views/grain/grain-form/grain-form.component';
import { GrainListComponent } from './model/views/grain/grain-list/grain-list.component';
import { SharedModule } from './shared/shared.module';
import { Error404Component } from './views/error404/error404.component';
import { LoginComponent } from './views/login/login.component';
import { EmployeeEditComponent } from './model/views/employee/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './model/views/employee/employee-list/employee-list.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LoginComponent,
    UserNavBarComponent,
    GrainFormComponent,
    SidebarComponent,
    FarmFormComponent,
    FarmListComponent,
    CompanyFormComponent,
    GrainListComponent,
    EmployeeFormComponent,
    HomeComponent,
    FarmTableComponent,
    Error404Component,
    GrainEditComponent,
    EmployeeEditComponent,
    EmployeeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgApexchartsModule,
    NgxMaskModule.forRoot(maskConfig), //https://www.npmjs.com/package/ngx-mask (como usar)
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule { }
