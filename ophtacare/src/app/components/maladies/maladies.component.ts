import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { AuthenticationService } from '../../services/authenticationService';
import { MaladiesService } from '../../services/maladiesService';

@Component({
  selector: 'app-maladies',
  providers: [ConfirmationService],
  templateUrl: './maladies.component.html',
  styleUrls: ['./maladies.component.css']
})
export class MaladiesComponent implements OnInit {

  public blocked;
  
  constructor(private authenticationService: AuthenticationService, private confirmationService: ConfirmationService,
    private maladiesServices: MaladiesService) { }

  ngOnInit() {
  }

}
