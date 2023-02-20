import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LazyLoadEvent } from 'primeng/api';
import { ProspectLabelService } from 'src/app/core/services/prospect-label/prospect-label.service';
import Swal from 'sweetalert2';
import { payload } from '../../prospects/contacts-list/modals/payload-modal';
import { CampaignsComponent } from '../campaigns/campaigns.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { ProspectsLabelsAddComponent } from '../prospects-labels-add/prospects-labels-add.component';
import { Label } from './prospects-labels.model';
@Component({
  selector: 'app-prospects-labels-list',
  templateUrl: './prospects-labels-list.component.html',
  styleUrls: ['./prospects-labels-list.component.scss'],
})
export class ProspectsLabelsListComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  userAccount = JSON.parse(localStorage.getItem('userprofile'));
  userId = this.user.id;
  userAccountId = this.userAccount.id;
  labels: Label[];
  selectedLabels: Label[];
  totalRecords: number;
  cols: any[];
  loading: boolean;
  pageSize = 10;
  currentPage = 0;
  payload = new payload();

  constructor(
    private prospectLabelService: ProspectLabelService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {}

  pageChanged(event: LazyLoadEvent) {
   
    event.first == 0
    ? (this.payload.page = 0)
    : (this.payload.page = (event.first ?? 10) / (event.rows ?? 10));
  this.payload.limit = event.rows;
  if (event.sortField != undefined) {
    if (event.sortOrder == 1) {
      this.payload.orderBy = `${event.sortField}`;
    } else {
      this.payload.orderBy = `-${event.sortField}`;
    }
  } else {
    this.payload.orderBy = '-modifiedAt';
  }

    this.fetchAllLabels();
  }

  fetchAllLabels() {
    this.selectedLabels=[];
    this.payload.userId = this.userId;
    this.payload.userAccountId = this.userAccountId;
    this.prospectLabelService.getLabels(this.payload).subscribe({
      next: (res: any) => {
        this.labels = res.content;
        this.totalRecords = res.totalElements;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.payload.filters = { name: filterValue };
    this.fetchAllLabels();
    if (filterValue === '') {
      this.payload.filters = {};
      this.fetchAllLabels();
    }
  }

  deleteBulkLabels() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.prospectLabelService
          .deleteLabels(this.user.id, this.userAccount.id, this.selectedLabels)
          .subscribe({
            next: (res: any) => {
              console.log(res);
              Swal.fire({
                text: ' Labels have been deleted.',
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: false,
              });
              setTimeout(() => {
                Swal.close();
                this.selectedLabels = [];
                this.fetchAllLabels();
              }, 1000);
            },
            error: (error: any) => {
              console.log(error);
            },
          });
      }
    });
  }

  editLabel(row) {
    const dialogRef = this.dialog.open(ProspectsLabelsAddComponent, {
      width: '600px',
      data: row,
    });
    dialogRef.afterClosed().subscribe((val) => {
      this.fetchAllLabels();
    });
  }

  deleteSingleLabel(row) {
    console.log(row);
    var labelId = [
      {
        id: row.id,
      },
    ];
    const userId = row.userId;
    const userAccountId = row.userAccountId;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.prospectLabelService
          .deleteLabels(userId, userAccountId, labelId)
          .subscribe({
            next: (res: any) => {
              console.log(res);
              Swal.fire({
                text: ' Label has been deleted.',
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: false,
              });
              setTimeout(() => {
                Swal.close();
                this.fetchAllLabels();
              }, 1000);
            },
            error: (error: any) => {
              console.log(error);
            },
          });
      }
    });
  }

  getCampaigns(row) {
    const dialogRef = this.dialog.open(CampaignsComponent, {
      width: '95%',
      height: '92%',
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  getContacts(row) {
    const dialogRef = this.dialog.open(ContactsComponent, {
      width: '70%',
      height: '92%',
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  openDialogue(): void {
    const dialogRef = this.dialog.open(ProspectsLabelsAddComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchAllLabels();
    });
  }
}
