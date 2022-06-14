import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProspectsLabelsAddComponent } from '../prospects-labels-add/prospects-labels-add.component';

//make an interface class to define the properties
//that goes inside the table
export interface User {
  name: string;
  age: number;
  subject: string;
  country: string;


}

//arr of objects defining properties inside the variable Data
const Data: User[] = [
  { name: 'John', age: 20, subject: 'Maths', country: 'England' },
  { name: 'Roe', age: 25, subject: 'English', country: 'America' },
  { name: 'Mac', age: 30, subject: 'Computers', country: 'Europe' },
  { name: 'Anderson', age: 29, subject: 'AI', country: 'USA' },
  { name: 'Peter', age: 19, subject: 'ML', country: 'Canada' },
  { name: 'Harry', age: 31, subject: 'Literature', country: 'Kabul' },

];

@Component({
  selector: 'app-prospects-labels-list',
  templateUrl: './prospects-labels-list.component.html',
  styleUrls: ['./prospects-labels-list.component.scss']
})
export class ProspectsLabelsListComponent {

  selectedOption = 'labelName';

  addLabel: string;
  labelDesc: string;
  pickColor: string;

  //define columns inside the variable displayedColumns
  displayedColumns: string[] = [
    'select', 'name', 'age', 'subject', 'country', 'actions'
  ];

  //initialise the dataSource with arr of values defined in Var Data
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  selection = new SelectionModel<User>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} `;
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

    this.dataSource.data = Data
  }
  openDialogue(): void {
    const dialogRef = this.dialog.open(ProspectsLabelsAddComponent, {
      width: '300px',
      height: '380px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }


}
