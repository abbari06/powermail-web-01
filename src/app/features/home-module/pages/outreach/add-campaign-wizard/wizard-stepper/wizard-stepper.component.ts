import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-wizard-stepper',
  templateUrl: './wizard-stepper.component.html',
  styleUrls: ['./wizard-stepper.component.scss']
})
export class WizardStepperComponent implements OnInit {
  isEnabled=false;
  items: MenuItem[];

  construct(){
  }
 
  ngOnInit() {
    this.items = [{
      label: 'Lets Start',
      routerLink: 'stepone',
  },
  {
      label: 'Schedule & Prospects',
      routerLink: 'steptwo'
  },
  {
      label: 'Message Steps',
      routerLink: 'stepthree'
  },
  {
      label: 'Preview & Launch',
      routerLink: 'stepfour'
  }
];

  }
 
  
 

}
