import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from './services/authenticationService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './guard/auth.guard';
import * as $ from 'jquery';
import { ButtonModule, ConfirmationService, ConfirmDialogModule, DataTableModule, SharedModule, CalendarModule,
  GrowlModule, BlockUIModule, OverlayPanelModule, DialogModule, InputTextModule,
  TabViewModule, DropdownModule, TabMenuModule, InputTextareaModule, CardModule, MessageModule } from 'primeng/primeng';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProgressBarModule } from 'primeng/progressbar';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatRadioModule,
  MatOptionModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatSelectModule,
  MatTabsModule,
  MatTableModule,
  MatGridListModule,
  MatMenuModule,
  MatChipsModule,
  MatCheckboxModule, MatPaginatorModule,
} from '@angular/material';
import { NavTopComponent } from './components/layout/nav-top/nav-top.component';
import { NavLeftComponent } from './components/layout/nav-left/nav-left.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PatientsComponent } from './components/patients/patients.component';
import { PatientsService } from './services/patientsService';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdministrateursComponent } from './components/administrateurs/administrateurs.component';
import { AdministrateursService } from './services/administrateursService';
import { StatModule } from './shared/modules/stat/stat.module';

// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
  /* for development
  return new TranslateHttpLoader(
      http,
      '/start-javascript/sb-admin-material/master/dist/assets/i18n/',
      '.json'
  );*/
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

const appRoutes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'patients', component: PatientsComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'administrateurs', component: AdministrateursComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavTopComponent,
    NavLeftComponent,
    PatientsComponent,
    DashboardComponent,
    AdministrateursComponent
  ],
  imports: [
    BrowserModule,
    StatModule,
    Ng2Charts,
    CommonModule,
    HttpModule,
    ButtonModule,
    TableModule,
    DataTableModule,
    ProgressBarModule,
    ConfirmDialogModule,
    SharedModule,
    GrowlModule,
    CalendarModule,
    BlockUIModule,
    ToastModule,
    ChartModule,
    SelectButtonModule,
    OverlayPanelModule,
    DialogModule,
    InputTextModule,
    TabViewModule,
    DropdownModule,
    TabMenuModule,
    InputTextareaModule,
    CardModule,
    MessageModule,
    ToolbarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    DatePickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatRadioModule,
    MatOptionModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatGridListModule,
    MatMenuModule,
    MatChipsModule,
    MatCheckboxModule, MatPaginatorModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
  }),
  LayoutModule,
  OverlayModule
  ],
  providers: [
    AuthenticationService,
    PatientsService,
    AdministrateursService,
    MessageService,
    ConfirmationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
