import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
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
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { LazyLoadEvent, MenuItem, SortEvent } from 'primeng/api';

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
  // encapsulation:ViewEncapsulation.None
})
export class ContactsListComponent implements OnInit, AfterViewInit {
  searched = false;
  mobileViewWidth = '80%';
  mobileViewHeight = '90%';
  addButtonItems: MenuItem[];
  contactList = [];
  addBulklabelsForm = new FormControl('');
  displayResponsive: any = false;
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

  //initialise the dataSource with arr of values defined in Var Data
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  selection = new SelectionModel<User>(true, []);
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  selectedContacts = [];
  totalContacts;
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
    private prospectLabelService: ProspectLabelService,
    private dashboardService: DashboardService,
    private breakpointObserver: BreakpointObserver
  ) {}
  ngAfterViewInit(): void {
    // this.getAllProspectes();
    this.dataSource.paginator = this.paginator;
  }

  displayStyle = 'none';
  displayStyleRemoveLabels = false;

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
    this.displayStyleRemoveLabels = true;
  }
  closeRemovePopup() {
    this.getAllProspectes();
    this.displayStyleRemoveLabels = false;
  }
  showResponsiveDialog() {
    this.fetchLabels();
    this.displayResponsive = true;
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.mobileViewWidth = '80%';
          this.mobileViewHeight = '70%';
        }
      });

    this.addButtonItems = [
      {
        label: 'Add new',
        icon: 'pi pi-fw pi-plus',
        command: () => {
          this.openContactDialogue();
        },
      },
      {
        label: 'Import CSV',
        icon: 'pi pi-fw pi-file-import',
        command: () => {
          this.openDialogue();
        },
      },
    ];
  }
  getAllProspectes() {
    this.selectedContacts = [];
    var user = JSON.parse(localStorage.getItem('user'));
    var userAccount = JSON.parse(localStorage.getItem('userprofile'));
    var userId = user.id;
    var userAccountId = userAccount.id;
    this.payload.userId = userId;
    this.payload.userAccountId = userAccountId;
    this.prospectesService.fetchProspectes(this.payload).subscribe({
      next: (res: any) => {
        this.dataSource.data = res.content;
        this.totalContacts = res.totalElements;

        if (this.dataSource.data.length > 0) {
          this.dashboardService.completedStep2 = true;
        }
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
    this.getAllProspectes();
  }
  applyFilter(event: Event) {
    this.searched = true;
    const filterValue = (event.target as HTMLInputElement).value;
    let value = filterValue.trim().toLowerCase();
    this.payload.filters = { [this.selectedOption]: value };
    this.getAllProspectes();
  }

  openDialogue(): void {
    const dialogRef = this.dialog
      .open(CsvMappingComponent, {
        width: this.mobileViewWidth,
        height: this.mobileViewHeight,
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
      width: this.mobileViewWidth,
      /// height: this.mobileViewHeight,
    });
    dialogRef.afterClosed().subscribe((val) => {
      if (val === 'submit') {
        Swal.fire({
          text: 'Prospect has been updated',
          icon: 'success',
          showCancelButton: false,
          showConfirmButton: false,
        });
        setTimeout(() => {
          Swal.close();
          this.getAllProspectes();
        }, 1000);
      }
    });
  }
  editProspect(row) {
    console.log(row);
    const dialogRef = this.dialog.open(AddSingleProspectComponent, {
      width: '70%',
      //height: '55%',
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
              Swal.fire({
                text: 'Your Prospect has been deleted.',
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: false,
              });
              setTimeout(() => {
                Swal.close();
                this.getAllProspectes();
              }, 1000);

              // Swal.fire('Deleted!', 'Your Prospect has been deleted.', 'success');
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
        this.selectedContacts
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            text: 'Labels have been added successfully.',
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: false,
          });
          setTimeout(() => {
            Swal.close();
            this.getAllProspectes();
          }, 1000);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    this.closePopup();
  }
  deleteBulkProspects() {
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
            this.selectedContacts
          )
          .subscribe({
            next: (res: any) => {
              console.log(res);
              Swal.fire({
                text: 'Prospects have been deleted.',
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: false,
              });
              setTimeout(() => {
                Swal.close();
                this.getAllProspectes();
              }, 1000);
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
    console.log(this.selectedContacts);
    var labels = [];
    for (let label of this.selectedContacts) {
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
    this.labelsRemoved.push(label);
    const index = this.selectedLabels.indexOf(label);
    if (index !== -1) {
      this.selectedLabels.splice(index, 1);
      this.selectedLabelsForm.setValue(this.selectedLabels);
    }
  }
  removeBulkLabels() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
    this.prospectesService
      .removeBulkLabels(
        this.user.id,
        this.userAccount.id,
        this.labelsRemoved,
        this.selectedContacts
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            text: 'Labels have been removed successfully.',
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: false,
          });
          setTimeout(() => {
            Swal.close();
            this.getAllProspectes();
          }, 1000);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    this.closeRemovePopup();
  }

  @ViewChild('search', {
    static: true,
  })
  search: ElementRef;
  onSearchClear() {
    this.searched = false;
    console.log(this.search.nativeElement.value);
    this.search.nativeElement.value = '';
    this.payload.filters = null;
    this.selectedOption = 'email';
    this.getAllProspectes();
  }
}
