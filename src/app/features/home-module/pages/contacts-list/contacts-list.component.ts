import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
export interface User {
  fName: string;
  lName: string;
  place: number;
  position: string;
  email: string;
  labels: string;

}

//arr of objects defining properties inside the variable Data
const Data: User[] = [
  { place: 1, fName: 'John', lName: 'Smith', email: 'abc@gmail.com', position: 'CEO', labels: 'A' },
  { place: 2, fName: 'John', lName: 'Smith', email: 'abc@gmail.com', position: 'CEO', labels: 'A' },
  { place: 3, fName: 'John', lName: 'Smith', email: 'abc@gmail.com', position: 'CEO', labels: 'A' },
  { place: 4, fName: 'John', lName: 'Smith', email: 'abc@gmail.com', position: 'CEO', labels: 'A' },
  { place: 5, fName: 'John', lName: 'Smith', email: 'abc@gmail.com', position: 'CEO', labels: 'A' },
  { place: 6, fName: 'John', lName: 'Smith', email: 'abc@gmail.com', position: 'CEO', labels: 'A' },
  { place: 7, fName: 'John', lName: 'Smith', email: 'abc@gmail.com', position: 'CEO', labels: 'A' },

];


@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent {

  //define columns inside the variable displayedColumns
  displayedColumns: string[] = [
    'select', 'position', 'fName', 'lName', 'email', 'company', 'position', 'labels', 'actions'
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.place + 1}`;
  }
  constructor() { }

  ngOnInit(): void {

    this.dataSource.data = Data
  }

}
