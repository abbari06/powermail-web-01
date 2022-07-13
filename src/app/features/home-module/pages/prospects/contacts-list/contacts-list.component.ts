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
import Swal from 'sweetalert2';
import { ProspectLabelService } from 'src/app/core/services/prospect-label/prospect-label.service';
import { FormControl } from '@angular/forms';
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
  addBulklabelsForm = new FormControl('');
  user = {
    id: undefined,
  };
  userAccount = {
    id: undefined,
  };
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
    private prospectLabelService: ProspectLabelService
  ) {}
  ngAfterViewInit(): void {
    this.getAllProspectes();
    this.dataSource.paginator = this.paginator;
  }

  displayStyle = 'none';
  displayStyleRemoveLabels = 'none';

  openPopup() {
    this.fetchLabels();
    this.displayStyle = 'block';
  }
  closePopup() {
    this.getAllProspectes();
    this.displayStyle = 'none';
  }
  openRemovePopup() {
    this.showSelectedLabels();
    this.displayStyleRemoveLabels = 'block';
  }
  closeRemovePopup() {
    this.getAllProspectes();
    this.displayStyleRemoveLabels = 'none';
  }
  ngOnInit(): void {}
  getAllProspectes() {
    this.payload.limit = this.pageSize;
    this.payload.page = this.currentPage;
    if (this.payload.orderBy === undefined) {
      this.payload.orderBy = '-modifiedAt';
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
        console.log(this.dataSource);
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
  allLabels = [];
  fetchLabels() {
    this.payload.limit = 50;
    this.payload.page = 0;
    this.payload.orderBy = '-modifiedAt';
    var user = JSON.parse(localStorage.getItem('user'));
    var userAccount = JSON.parse(localStorage.getItem('userprofile'));
    var userId = user.id;
    var userAccountId = userAccount.id;
    this.payload.userId = userId;
    this.payload.userAccountId = userAccountId;
    this.prospectLabelService.getLabels(this.payload).subscribe({
      next: (res: any) => {
        this.allLabels = res.content;
        console.log(this.allLabels);
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
      this.payload.orderBy = '-modifiedAt';
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
    const dialogRef = this.dialog.open(AddSingleProspectComponent, {
      width: '50%',
      height: '45%',
    });
    dialogRef.afterClosed().subscribe((val) => {
      if (val === 'submit') {
        this.getAllProspectes();
      }
    });
  }
  editProspect(row) {
    console.log(row);
    const dialogRef = this.dialog.open(AddSingleProspectComponent, {
      width: '50%',
      height: '45%',
      data: row,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllProspectes();
    });
  }
  deleteSingleProspect(row) {
    console.log(row);
    var userId = row.userId;
    var userAccountId = row.userAccountId;
    var prospects = [
      {
        id: row.id,
      },
    ];
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
        this.prospectesService
          .deleteProspects(userId, userAccountId, prospects)
          .subscribe({
            next: (res: any) => {
              console.log(res);
              Swal.fire('Deleted!', 'Your Label has been deleted.', 'success');
              this.getAllProspectes();
            },
            error: (error: any) => {
              console.log(error);
            },
          });
      }
    });
  }
  addBulkLabels() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
    this.prospectesService
      .addBulkLabels(
        this.user.id,
        this.userAccount.id,
        this.addBulklabelsForm.value,
        this.selection.selected
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire('Added!', 'Labels Added Successfully!', 'success');
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    this.closePopup();
  }
  deleteBulkProspects() {
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
        this.prospectesService
          .deleteProspects(
            this.user.id,
            this.userAccount.id,
            this.selection.selected
          )
          .subscribe({
            next: (res: any) => {
              console.log(res);
              Swal.fire(
                'Deleted!',
                'Your Labels Have Been Deleted.',
                'success'
              );
              this.getAllProspectes();
            },
            error: (error: any) => {
              console.log(error);
            },
          });
      }
    });
  }
  onLabelRemoved(label) {
    const categories = this.addBulklabelsForm.value as string[];
    this.removeFirst(categories, label);
    // To trigger change detection
    // this.selectedProspectLabels
  }
  private removeFirst(categories, cat): void {
    const index = categories.indexOf(cat);
    if (index !== -1) {
      categories.splice(index, 1);
      this.addBulklabelsForm.setValue(categories);
    }
  }
  selectedLabelsForm = new FormControl();
  selectedLabels = [];
  showSelectedLabels() {
    console.log(this.selection.selected);
    var labels = [];
    for (let label of this.selection.selected) {
      labels.push(...label.labels);
    }
    var filterLabels = Array.from(
      labels.reduce((m, t) => m.set(t.name, t), new Map()).values()
    );

    this.selectedLabels = filterLabels;
    this.selectedLabelsForm.setValue(this.selectedLabels);
  }
  labelsRemoved = [];
  onBulkLabelRemove(label) {
    console.log(label);
    this.labelsRemoved.push(label);
    const index = this.selectedLabels.indexOf(label);
    if (index !== -1) {
      this.selectedLabels.splice(index, 1);
      this.selectedLabelsForm.setValue(this.selectedLabels);
    }
    console.log(this.selectedLabelsForm.value);
  }
  removeBulkLabels() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
    this.prospectesService
      .removeBulkLabels(
        this.user.id,
        this.userAccount.id,
        this.labelsRemoved,
        this.selection.selected
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire('Removed!', 'Labels Removed Successfully!', 'success');
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    this.closeRemovePopup();
  }
}
