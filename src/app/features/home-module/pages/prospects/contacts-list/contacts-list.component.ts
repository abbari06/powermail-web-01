import { SelectionModel } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatRow, MatTableDataSource } from '@angular/material/table';
import { payload } from './modals/payload-modal';
import { ProspectesService } from 'src/app/core/services/prospectus-services/prospectes.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CsvMappingComponent } from '../csv-importer/csv-mapping/csv-mapping.component';
import { AddSingleProspectComponent } from '../add-single-prospect/add-single-prospect.component';
import { CsvService } from 'src/app/core/services/prospectus-services/csv.service';
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
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss'],
})
export class ContactsListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  selectedOption = 'email';
  disableBtn = true;
  tableRow: any;
  closeResult: string = '';
  public records: any[] = [];
  //define columns inside the variable displayedColumns
  displayedColumns: string[] = [
    'select',
    'firstname',
    'lastname',
    'email',
    'company',
    'position',
    'labels',
    'actions',
  ];
  //initialise the dataSource with arr of values defined in Var Data
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  selection = new SelectionModel<User>(true, []);
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [10, 20, 30, 50];
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
    //this.disableBtn = false;
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.place + 1
    }`;
  }
  payload = new payload();
  constructor(
    private prospectesService: ProspectesService,
    public dialog: MatDialog,
    // private modalService: NgbModal,
    private csvService: CsvService
  ) {}
  ngAfterViewInit(): void {
    this.getAllProspectes();
    this.dataSource.paginator = this.paginator;
  }

  displayStyle = 'none';

  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }
  ngOnInit(): void {}
  getAllProspectes() {
    this.payload.limit = this.pageSize;
    this.payload.page = this.currentPage;
    if (this.payload.orderBy == undefined) {
      this.payload.orderBy = '-modifiedBy';
    }
    var user = JSON.parse(localStorage.getItem('user'));
    var userAccount = JSON.parse(localStorage.getItem('userprofile'));
    var userId = user.id;
    var userAccountId = userAccount.id;
    this.payload.userId = userId;
    this.payload.userAccountId = userAccountId;
    this.prospectesService.fetchProspectes(this.payload).subscribe({
      next: (res: any) => {
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
  }
  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAllProspectes();
    this.isAllSelected();
    // if (!this.selection.isSelected) {
    this.selection.clear();
    // }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let value = filterValue.trim().toLowerCase();
    this.payload.filters = { [this.selectedOption]: value };
    this.getAllProspectes();
  }
  sort(event) {
    console.log(event);
    if (event.direction === 'asc') {
      this.payload.orderBy = event.active;
    } else if (event.direction === 'desc') {
      this.payload.orderBy = '-' + event.active;
    } else {
      this.payload.orderBy = '-modifiedBy';
    }
    this.getAllProspectes();
  }
  openDialogue(): void {
    const dialogRef = this.dialog
      .open(CsvMappingComponent, {
        width: '95%',
        height: '95%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'submit') {
          this.getAllProspectes();
        }
      });
  }
  openContactDialogue() {
    const dialogRef = this.dialog
      .open(AddSingleProspectComponent, {
        width: '50%',
        height: '50%',
      })
      .afterClosed()
      .subscribe((val) => {});
  }
}
