import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { OutreachService } from 'src/app/core/services/outreach/outreach.service';
import { MatRow, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {NgbModal, ModalDismissReasons, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

export interface User {
  fName: string;
  lName: string;
  place: number;
  company: string;
  position: string;
  email: string;
  labels: string;
}
@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
  providers:[NgbModalConfig, NgbModal]
})

export class StepTwoComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  selectedLabels = new FormControl();
  //schedule = new FormControl();
  closeResult:string
  displayStyle = 'none';
  user = {
    id: undefined,
  };
  userAccount = {
    id: undefined,
  };
  campaign={
    id:undefined
  }
  id:any;
  displayedColumns: string[] = [
    'firstname',
    'lastname',
    'email',
    'company',
    'position',
    'labels',
  ];
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [5,10, 20, 30, 50];
  limit = 10;
  page = 0;
  orderBy = '-name';
  allSchedules = [];
  allLabels:any;
  availableProspectes=0;
  constructor(
    private formBuilder: FormBuilder,
    private outreachService: OutreachService,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private router:Router,
    private route:ActivatedRoute
  ) {}
  
  AddCampaignFormTwo = this.formBuilder.group({
    schedule: ['', [Validators.required]],
  });
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
    this.id=this.route.snapshot.queryParamMap.get('id');
    this.campaign.id=this.id;
    this.getCampaignById();
    this.fetchAllSchedules();
    this.fetchAllLabels();
  }
 getCampaignById(){
  this.outreachService.getCampaignsById(this.user.id,this.userAccount.id,this.campaign).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.AddCampaignFormTwo.controls['schedule'].setValue(res.schedule)
      
      this.selectedLabels.setValue(res.labels)
      this.onLabelSelect(this.selectedLabels.value);
      this.outreachService.payload.campaign.title=res.title;
      this.outreachService.payload.campaign.description=res.description;
      this.outreachService.payload.campaign.mailAccountId=res.mailAccountId;
      this.outreachService.payload.campaign.steps=res.steps;
    },
    error:(error:any)=>{
      console.log(error);
      
    }
  })
 }
  fetchAllSchedules() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
    this.outreachService
      .listAllSchedules(this.user.id, this.userAccount.id)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.allSchedules = res;
          console.log(this.allSchedules)
         
        },
        error: (error: any) => {
          alert(error);
          console.log(error);
        },
      });
  }
  fetchAllLabels(){
    this.outreachService.getLabels(this.user.id,this.userAccount.id,this.page,this.limit,this.orderBy).subscribe({
      next: (res: any) => {
        console.log(res);
        this.allLabels = res.content;
        console.log(this.allLabels)
      },
      error: (error: any) => {
        alert(error);
        console.log(error);
      },
    });
  }
  onLabelRemoved(label: string) {
    const allLabels = this.selectedLabels.value as string[];
    this.removeFirst(allLabels, label);
    // To trigger change detection
    // this.selectedProspectLabels
  }
  private removeFirst(allLabels, label): void {
    
    const index = allLabels.indexOf(label);
    if (index !== -1) {
      allLabels.splice(index, 1);
      console.log(allLabels)
      this.onLabelSelect(allLabels);
      this.selectedLabels.setValue(allLabels);
    }
  }
  label:any;
  onLabelSelect(data){
    
    if(data.value){
     this.label=data.value;
     
    }
    if(!data.value){
      this.label=data;
    }
    if(this.label.length!=0){
    this.outreachService.getProspectesByLabels(this.user.id,this.userAccount.id,this.label,this.currentPage,this.pageSize,this.orderBy).subscribe({
      next: (res: any) => {
        this.dataSource.data = res.content;
        if(res.numberOfElements>=0){
        this.availableProspectes=res.totalElements
        }
        else if(res.length){
          this.availableProspectes=res.length
        }
      },
      error: (error: any) => {
        alert(error);
        console.log(error);
      },
    });
  }
  else{
    this.availableProspectes=0;
  }
  }
  paged=false;
  pageChanged(event: PageEvent) {
    this.paged=true;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.onLabelSelect(this.label);
  }
  open(content) {
    
    this.modalService.open(content, {size:'lg' , backdrop:'static'})
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  addCampaignStepTwo(){
    this.outreachService.payload.campaign.id=this.campaign.id;
    this.outreachService.payload.userId=this.user.id;
    this.outreachService.payload.userAccountId=this.userAccount.id;
    this.outreachService.payload.campaign.schedule=this.AddCampaignFormTwo.controls['schedule'].value;
    this.outreachService.payload.campaign.labels=this.selectedLabels.value;
    this.outreachService.addCampaignStepTwo();
  }
  backToStepOne(){
    this.router.navigate(['/home/outreach/addcampaign/stepone'],{queryParams:{id:this.id}});
  }
  compareFn(o1: any, o2: any): boolean {
    // if possible compare by object's name, and not by reference.
    return o1 && o2 ? o1.name === o2.name : o2 === o2;
    //if (o1.name === o2.name) return true;
  }
  compareColors(p1: any, p2: any): boolean {
    if (p1 && p2) {
        return p1.name === p2.name;
    }
    return false;
}
}
