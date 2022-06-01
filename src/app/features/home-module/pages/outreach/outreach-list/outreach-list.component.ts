import { Component, OnInit } from '@angular/core';

export interface Outreach{
  status:string;
  campaign:string;
  title:string;
  senderEmail:string;
  progress:string;
  createdAt:string;
  stats:string;

}
 
//arr of objects defining properties inside the variable Data
const Data: Outreach[] = [
  {status:'Active',campaign:'BB',title:'Powermail',senderEmail:'ferzan@gmail.com',progress:'Completed',createdAt:'1-June-2022',stats:'ABC'},
  {status:'Inactive',campaign:'BB',title:'Powermail',senderEmail:'ferzan@gmail.com',progress:'Completed',createdAt:'1-June-2022',stats:'ABC'},
  {status:'Inactive',campaign:'BB',title:'Powermail',senderEmail:'ferzan@gmail.com',progress:'Completed',createdAt:'1-June-2022',stats:'ABC'},
  {status:'Active',campaign:'BB',title:'Powermail',senderEmail:'ferzan@gmail.com',progress:'Completed',createdAt:'1-June-2022',stats:'ABC'},
  {status:'Active',campaign:'BB',title:'Powermail',senderEmail:'ferzan@gmail.com',progress:'Completed',createdAt:'1-June-2022',stats:'ABC'},
  {status:'Inactive',campaign:'BB',title:'Powermail',senderEmail:'ferzan@gmail.com',progress:'Completed',createdAt:'1-June-2022',stats:'ABC'},
  {status:'Active',campaign:'BB',title:'Powermail',senderEmail:'ferzan@gmail.com',progress:'Completed',createdAt:'1-June-2022',stats:'ABC'},
  {status:'Inactive',campaign:'BB',title:'Powermail',senderEmail:'ferzan@gmail.com',progress:'Completed',createdAt:'1-June-2022',stats:'ABC'},
  {status:'Inactive',campaign:'BB',title:'Powermail',senderEmail:'ferzan@gmail.com',progress:'Completed',createdAt:'1-June-2022',stats:'ABC'},

];


@Component({
  selector: 'app-outreach-list',
  templateUrl: './outreach-list.component.html',
  styleUrls: ['./outreach-list.component.scss']
})
export class OutreachListComponent {

  displayedColumns: string[] = [
    'status', 'campaign', 'title', 'senderEmail','progress','createdAt','stats','actions'
  ];

 
  dataSource = Data;

  constructor() { }

  ngOnInit(): void {
  }

}
