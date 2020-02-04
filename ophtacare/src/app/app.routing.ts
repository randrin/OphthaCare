import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/back-office/login/login.component';
import { HomeComponent } from './components/back-office/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { PatientsComponent } from './components/back-office/patients/patients.component';
import { DashboardComponent } from './components/back-office/dashboard/dashboard.component';
import { AdministrateursComponent } from './components/back-office/administrateurs/administrateurs.component';
import { MedecinsComponent } from './components/back-office/medecins/medecins.component';
import { MaladiesComponent } from './components/back-office/maladies/maladies.component';
import { ProfessionsMedecinsComponent } from './components/back-office/professionsMedecins/professionsMedecins.component';
import { ReportsComponent } from './components/back-office/reports/reports.component';
import { ProfilComponent } from './components/back-office/profil/profil.component';
import { PermissionsComponent } from './components/back-office/permissions/permissions.component';
import { OphthacareComponent } from './components/site/ophthacare/ophthacare.component';
import { PlatformComponent } from './components/site/platform/platform.component';
import { TeamComponent } from './components/site/team/team.component';
import { SupportComponent } from './components/site/support/support.component';
import { ContactComponent } from './components/site/contact/contact.component';
import { PrivacyPolicyComponent } from './components/site/privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './components/site/legal-notice/legal-notice.component';
import { TermsAndConditionsComponent } from './components/site/terms-and-conditions/terms-and-conditions.component';
import { PageNotFoundComponent } from './components/site/page-not-found/page-not-found.component';
import {AppointmentsComponent}   from './components/back-office/appointments/appointments.component'

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'patients', component: PatientsComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'administrateurs', component: AdministrateursComponent },
    { path: 'medecins', component: MedecinsComponent },
    { path: 'maladies', component: MaladiesComponent },
    { path: 'professions', component: ProfessionsMedecinsComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'profil', component: ProfilComponent },
    { path: 'permissions', component: PermissionsComponent },
    { path: 'opththacare', component: OphthacareComponent },
    { path: 'platform', component: PlatformComponent },
    { path: 'team', component: TeamComponent },
    { path: 'support', component: SupportComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'legal-notice', component: LegalNoticeComponent },
    { path: 'terms-conditions', component: TermsAndConditionsComponent },
    { path: 'appointments', component: AppointmentsComponent },
    { path: '**', component: PageNotFoundComponent }
  ];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(appRoutes, {
          useHash: true
        })
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
