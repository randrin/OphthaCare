import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/primeng';
import { AuthenticationService } from '../../services/authenticationService';
import { MaladiesService } from '../../services/maladiesService';
import { Maladies } from '../../models/maladies/maladies';
import saveAs from 'save-as';

@Component({
  selector: 'app-maladies',
  providers: [ConfirmationService],
  templateUrl: './maladies.component.html',
  styleUrls: ['./maladies.component.css']
})
export class MaladiesComponent implements OnInit {

  public blocked;
  public maladies: Maladies = { list: [] };
  public response = {
    code: 0,
    message: ''
  };

  constructor(private authenticationService: AuthenticationService, private confirmationService: ConfirmationService,
    private maladiesService: MaladiesService, private messageService: MessageService) { }

    ngOnInit() {
      this.blocked = true;
      setTimeout(() => {
        this.blocked = false;
      }, 1000);
      this.getMaladies();
    }

    getMaladies () {
    this.blocked = true;
    this.maladiesService.getAllMaladies(this.authenticationService.getUsername()).subscribe(
      response => {
        this.maladies.list = [];
        if (response.json() != null) {
          this.maladies.list = this.maladies.list.concat(response.json().filter(n => n));
        }
    });
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
  }

  exportExcelMaladies() {
    console.log('Export excel file called: -> Maladies');
    this.maladiesService.exportMaladies(this.authenticationService.getUsername()).subscribe(
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
          this.downloadMaladiesFile(data);
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

  downloadMaladiesFile(data: any) {
    const blob = new Blob([data.blob()], { type: 'application/octet-stream' });
    saveAs(blob, 'Maladies_OphthaCare.xlsx');
  }
}
