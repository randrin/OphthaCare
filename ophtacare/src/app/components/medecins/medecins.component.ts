import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { AuthenticationService } from '../../services/authenticationService';
import { MedecinsService } from '../../services/medecinsService';
import { Medecins } from '../../models/medecins/medecins';
import { MessageService } from 'primeng/api';
import saveAs from 'save-as';

@Component({
  selector: 'app-medecins',
  providers: [ConfirmationService],
  templateUrl: './medecins.component.html',
  styleUrls: ['./medecins.component.css']
})
export class MedecinsComponent implements OnInit {

  public blocked;
  public medecins: Medecins = { list: [] };
  public response = {
    code: 0,
    message: ''
  };

  constructor(private authenticationService: AuthenticationService, private medecinsService: MedecinsService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
    this.getmedecins();
  }

  getmedecins () {
    this.blocked = true;
    this.medecinsService.getAllMedecins(this.authenticationService.getUsername()).subscribe(
      response => {
        this.medecins.list = [];
        if (response.json() != null) {
          this.medecins.list = this.medecins.list.concat(response.json().filter(n => n));
        }
    });
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
  }

  exportExcelmedecins() {
    console.log('Export excel file called: -> medecins');
    this.medecinsService.exportMedecins(this.authenticationService.getUsername()).subscribe(
      data => {
        console.log('Response: ' + JSON.stringify(data));
        this.response = {
          code: data.status,
          message: data.statusText
        };
        if (this.response.message !== 'OK') {
          this.messageService.add({
            sticky: true,
            severity: 'error',
            summary: 'Erreur code ' + this.response.code,
            detail: 'Message ' + this.response.message
          });
        } else {
          this.downloadmedecinsFile(data);
        }
      },
      error => {
        this.messageService.add({
          sticky: true,
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur Technique'
        });
      }
    );
  }

  downloadmedecinsFile(data: any) {
    const blob = new Blob([data.blob()], { type: 'application/octet-stream' });
    saveAs(blob, 'medecins_OphthaCare.xlsx');
  }
}
