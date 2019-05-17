import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { AuthenticationService } from '../../services/authenticationService';
import { SpecialistesService } from '../../services/specialistesService';
import { Specialistes } from '../../models/specialistes/specialistes';
import { MessageService } from 'primeng/api';
import saveAs from 'save-as';

@Component({
  selector: 'app-specialistes',
  providers: [ConfirmationService],
  templateUrl: './specialistes.component.html',
  styleUrls: ['./specialistes.component.css']
})
export class SpecialistesComponent implements OnInit {

  public blocked;
  public specialistes: Specialistes = { list: [] };
  public response = {
    code: 0,
    message: ''
  };

  constructor(private authenticationService: AuthenticationService, private specialistesService: SpecialistesService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
    this.getSpecialistes();
  }

  getSpecialistes () {
    this.blocked = true;
    this.specialistesService.getAllSpecialistes(this.authenticationService.getUsername()).subscribe(
      response => {
        this.specialistes.list = [];
        if (response.json() != null) {
          this.specialistes.list = this.specialistes.list.concat(response.json().filter(n => n));
        }
    });
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
  }

  exportExcelSpecialistes() {
    console.log('Export excel file called: -> Specialistes');
    this.specialistesService.exportSpecialistes(this.authenticationService.getUsername()).subscribe(
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
          this.downloadSpecialistesFile(data);
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

  downloadSpecialistesFile(data: any) {
    const blob = new Blob([data.blob()], { type: 'application/octet-stream' });
    saveAs(blob, 'Specialistes_OphthaCare.xlsx');
  }
}
