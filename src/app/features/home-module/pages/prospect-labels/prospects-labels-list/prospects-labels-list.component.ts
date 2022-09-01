import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ProspectsLabelsAddComponent } from '../prospects-labels-add/prospects-labels-add.component';
import { ProspectLabelService } from 'src/app/core/services/prospect-label/prospect-label.service';
import { payload } from '../../prospects/contacts-list/modals/payload-modal';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { ContactsComponent } from '../contacts/contacts.component';
import { CampaignsComponent } from '../campaigns/campaigns.component';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

//make an interface class to define the properties
//that goes inside the table
export interface User {
  name: string;
  age: number;
  subject: string;
  country: string;
}

//arr of objects defining properties inside the variable Data
const Data: User[] = [];

@Component({
  selector: 'app-prospects-labels-list',
  templateUrl: './prospects-labels-list.component.html',
  styleUrls: ['./prospects-labels-list.component.scss'],
})
export class ProspectsLabelsListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  searched=false;
  payload = new payload();
  selectedOption = 'name';
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [10, 20, 30, 50];
  disableBtn: boolean = true;

  addLabel: string;
  labelDesc: string;
  pickColor: string;

  //define columns inside the variable displayedColumns
  displayedColumns: string[] = [
    'select',
    'name',
    'description',
    'color',
    'contacts',
    'outreach',
    'actions',
  ];

  //initialise the dataSource with arr of values defined in Var Data
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  selection = new SelectionModel<User>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    if (numSelected > 0) {
      this.disableBtn = false;
    } else {
      this.disableBtn = true;
    }
    const numRows = this.dataSource.data.length;
    if (numSelected === numRows) {
      return true;
    } else {
      return false;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    //console.log(row);
    //console.log(this.selection.selected);
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} `;
  }

  constructor(
    public dialog: MatDialog,
    private prospectLabelService: ProspectLabelService,private breakpointObserver:BreakpointObserver
  ) {}
    mobileViewWidth='30%';
    mobileViewHeight='40%';
    contactsWidth= '80%';
    contactsHeight='80%';
  ngOnInit(): void {
    this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.mobileViewWidth = '80%';
        this.mobileViewHeight='70%';
        this.contactsWidth='100%';
        this.contactsHeight='90%';
        console.log(
          'Matches small viewport or handset in portrait mode'
        );
      }
    });
  }

  ngAfterViewInit(): void {
    this.fetchAllLabels();
    this.dataSource.paginator = this.paginator;
  }
  fetchAllLabels() {
    this.payload.limit = this.pageSize;
    this.payload.page = this.currentPage;
    if (this.payload.orderBy == undefined) {
      this.payload.orderBy = '-modifiedAt';
    }
    var user = JSON.parse(localStorage.getItem('user'));
    var userAccount = JSON.parse(localStorage.getItem('userprofile'));
    var userId = user.id;
    var userAccountId = userAccount.id;
    this.payload.userId = userId;
    this.payload.userAccountId = userAccountId;
    this.prospectLabelService.getLabels(this.payload).subscribe({
      next: (res: any) => {
        this.selection.clear();
        console.log(res);
        this.dataSource.data = res.content;
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = res.totalElements;
        });
      },
      error: (error: any) => {
        console.log(error);
      },
    });
    //this.prospectLabelService.getLabels();
    this.dataSource.data = Data;
  }

  openDialogue(): void {
    const dialogRef = this.dialog.open(ProspectsLabelsAddComponent, {
      width: this.mobileViewWidth,
      //height: '50%',
    });

    dialogRef.afterClosed().subscribe(() => {
        this.fetchAllLabels();
    });
  }
  getContacts(row) {
    console.log(row);
    const dialogRef = this.dialog.open(ContactsComponent, {
      width:this.contactsWidth,
      height:this.contactsWidth,
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
     
    });
  }
  getCampaigns(row) {
    console.log(row);
    const dialogRef = this.dialog.open(CampaignsComponent, {
      width: this.contactsWidth,
      height: this.contactsHeight,
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      
    });
  }
  
  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.fetchAllLabels();
    this.isAllSelected();
    // if (!this.selection.isSelected) {
    this.selection.clear();
    // }
  }
  sort(event) {
    console.log(event);
    if (event.direction === 'asc') {
      this.payload.orderBy = event.active;
    } else if (event.direction === 'desc') {
      this.payload.orderBy = '-' + event.active;
    } else {
      this.payload.orderBy = '-modifiedAt';
    }
    this.fetchAllLabels();
  }
  applyFilter(event: Event) {
    this.searched=true;
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    // let value = filterValue.trim().toLowerCase();
    this.payload.filters = { [this.selectedOption]: filterValue };
    this.fetchAllLabels();
    if (filterValue === '') {
      this.payload.filters = {};
      this.fetchAllLabels();
    }
  }
  editLabel(row) {
    console.log(row);
    const dialogRef = this.dialog.open(ProspectsLabelsAddComponent, {
      width: '300px',
      //height: '380px',
      data: row,
    });
    dialogRef.afterClosed().subscribe((val) => {
      //if(val=="result"){
        this.fetchAllLabels();
    //  }
      
    });
  }

  deleteSingleLabel(row) {
    console.log(row);
    var labelId = [
      {
        id: row.id,
      },
    ];
    //const labelId=row.id;
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
                text: " Label has been deleted.",
                icon: 'success',
                showCancelButton: false,
                showConfirmButton:false,
              })
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
  user = {
    id: undefined,
  };
  userAccount = {
    id: undefined,
  };
  deleteBulkLabels() {
    console.log(this.selection.selected);
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
          .deleteLabels(
            this.user.id,
            this.userAccount.id,
            this.selection.selected
          )
          .subscribe({
            next: (res: any) => {
              console.log(res);
              Swal.fire({
                text: " Labels have been deleted.",
                icon: 'success',
                showCancelButton: false,
                showConfirmButton:false,
              })
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
  @ViewChild('search', {  
    static: true  
}) search: ElementRef  
onSearchClear() {   
  this.searched=false;
    console.log(this.search.nativeElement.value);
    this.search.nativeElement.value='';
    this.payload.filters=null;
    this.fetchAllLabels();
}  

}
