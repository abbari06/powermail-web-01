import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CsvService } from 'src/app/core/services/prospectus-services/csv.service';
import Swal from 'sweetalert2';
export interface Contact {
  firstname: String;
  lastname: String;
  email: String;
  company: String;
  position: String;
}
@Component({
  selector: 'app-csv-mapping',
  templateUrl: './csv-mapping.component.html',
  styleUrls: ['./csv-mapping.component.scss'],
})
export class CsvMappingComponent implements OnInit {
  private requiredHeaders: Contact = {
    firstname: 'First Name',
    lastname: 'Last Name',
    email: 'Email',
    company: 'Company',
    position: 'Position',
  };
  toasts: any[] = [];
  loader: any;
  imported = false;
  public successData: Contact[] = [];
  public errorData: Contact[] = [];
  private extraFields: any = {};
  private rawCsvData: any;
  private csvData: any;
  fieldMapForm!: FormGroup;
  fileSelectionForm!: FormGroup;
  parser!: string;
  customCSVHeaders: string[] = [];
  parseHeaders: any[] = [];
  isValid!: boolean;
  importFrom!: number;
  viewPreview: any;
  viewCsvMap: any;
  actionBtn: string = 'Submit';
  displayError: boolean = false;
  displaySuccess: boolean = true;
  submitContacts: boolean = false;
  constructor(
    private fb: FormBuilder,
    private csvImport: CsvService,
    private http: HttpClient,
    private router: Router,
    private dialogRef: MatDialogRef<CsvMappingComponent>
  ) {
    this.createForm();
  }
  /**
   * Set parser and raw data
   */
  readParserAndData() {
    // const typeCSVGroup = this.fileSelectionForm.controls.typeCSV as FormGroup;
    this.rawCsvData = this.csvImport.getcsvdata();
    console.log('raw csv \n' + this.rawCsvData);
    this.parser = 'custom';
  }
  /**
   * Create field mapper form
   */
  createForm() {
    this.fieldMapForm = this.fb.group({
      containsHeaders: [true],
      firstname: [''],
      lastname: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      company: [''],
      position: [''],
    });

    this.fieldMapForm.controls.containsHeaders.valueChanges.subscribe(
      (value) => {
        console.log('checkbox');
        this.parseCSVFileConent();
      }
    );
  }
  /**
   * Remove double Quotes from string start and end
   * @param data Data retrieved from the CSV file
   */
  filterColumnData(data: any): any {
    if (data) {
      let filteredData = data;

      if (filteredData.charAt(0) === '"') {
        //Remove Starting quotes
        filteredData = filteredData.substring(1, filteredData.length - 1);
      }

      if (filteredData.charAt(filteredData.length - 1) === '"') {
        //Remove Trailing quotes
        filteredData = filteredData.substring(0, filteredData.length);
      }

      return filteredData.replace(' ', '');
    }
    return;
  }
  uploadListener($event: any): void {
    //let files = $event.srcElement.files;
    this.csvImport.handlecsvdata($event);
    if ($event.srcElement.files.length !== 0) {
      this.imported = true;
    }
  }
  /**
   * Parse the data based on Custom parser
   */

  parseCSVFileConent() {
    if (this.rawCsvData && this.parser) {
      const fileContent = Object.assign([], this.rawCsvData);
      const fileHeaders = fileContent[0].split(',');
      const containsHeaders = this.fieldMapForm.controls.containsHeaders.value;
      console.log(fileContent);
      console.log(fileHeaders);
      //Fill the headers retrieved from the CSV file into customCSVHeaders
      if (containsHeaders) {
        fileHeaders.forEach((header: any, i: any) => {
          this.customCSVHeaders[i] = this.filterColumnData(header);
        });
        fileContent.shift();
      } else {
        fileHeaders.forEach((header: any, i: any) => {
          this.customCSVHeaders[i] = `Column ${i + 1}`;
        });
      }
      this.csvData = fileContent;
      console.log(this.csvData);
      //Set Header key, text and columnIndex
      //This can be later extended to have additional columns from user
      this.parseHeaders = [];
      console.log(this.requiredHeaders);
      if (
        this.requiredHeaders &&
        Object.keys(this.requiredHeaders).length > 0
      ) {
        Object.keys(this.requiredHeaders).forEach((headerKey, i) => {
          const columnIndex = containsHeaders
            ? this.getDefaultColumnIndex(headerKey)
            : 0;

          this.parseHeaders.push({
            key: headerKey,
            text: (this.requiredHeaders as any)[headerKey],
            columnIndex: columnIndex,
          });
          this.fieldMapForm.controls[headerKey].setValue(columnIndex);
        });
      }
      console.log(this.parseHeaders);
    }
  }
  /**
   * Display sample data for the selected column
   * @param columnIndex Index of the column
   */
  showSampleData(columnIndex: any) {
    if (this.csvData && this.csvData.length > 0) {
      const data = this.csvData;
      const firstData = data[0].split(',');
      return this.filterColumnData(firstData[columnIndex]);
    }
    return;
  }
  /* Validate email column in the custom parser */
  hasValidEmail(columnIndex: any): boolean {
    const columnValue: any = this.showSampleData(columnIndex);
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const testData = re.test(columnValue);
    this.isValid = testData;
    return !testData;
  }
  /**
   * Get the column index for mapping the fields
   * @param field_name
   */
  getDefaultColumnIndex(field_name: string): number {
    let fieldIndex: number = 0;
    switch (this.parser) {
      case 'custom':
        fieldIndex = this.customParserDefaultFields(field_name);
        break;

      default:
        break;
    }

    return fieldIndex;
  }

  /**
   * Get column index for the field passed
   * @param field_name
   */
  customParserDefaultFields(field_name: string): number {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //Traverse data to get email matching index
    if (field_name === 'email' && this.csvData.length > 0) {
      const data = this.csvData;
      const firstRow = data[0].split(',');
      if (firstRow.length > 0) {
        for (let i = 0; i < firstRow.length; i++) {
          if (field_name === 'email' && re.test(firstRow[i])) {
            return i;
          }
        }
      }
    }

    if (field_name !== 'email_id' && this.customCSVHeaders.length > 0) {
      let fieldRegrex = /^$/;
      switch (field_name) {
        case 'firstname':
          fieldRegrex = /^firstname|first name|first$/;
          break;
        case 'lastname':
          fieldRegrex = /^lastname|last name|last$/;
          break;
        case 'company':
          fieldRegrex = /^company|company name|place$/;
          break;
        case 'position':
          fieldRegrex = /^position|job title|designation$/;
          break;
        default:
          break;
      }

      for (var i = 0; i < this.customCSVHeaders.length; i++) {
        if (
          this.customCSVHeaders[i] &&
          fieldRegrex.test(this.customCSVHeaders[i].toLowerCase())
        ) {
          return i;
        }
      }
    }

    return 0; //send column index 0 if no match
  }
  mapping() {
    if (this.csvImport.getcsvdata().length !== 0) {
      this.parseCSVFileConent();
      this.readParserAndData();
    }
  }

  next(): void {
    this.processData();
    if (this.successData.length == 0) {
      this.displaySuccess = false;
      this.submitContacts = true;
    } else {
      this.displaySuccess = true;
      this.submitContacts = false;
    }
  }
  /**
   * Process the data based on the fields mapped
   */
  processData() {
    if (this.csvData.length > 0) {
      this.csvData.forEach((data: any, i: any) => {
        if (data) {
          const row: string[] = data.split(',');
          let contact: any = {};
          let errorCount: number = 0;
          const formData = Object.assign({}, this.fieldMapForm.value);
          delete formData.containsHeaders;
          let rowDataHasErrors: boolean = false;

          for (let header in formData) {
            if (header === 'extra_fields') {
              const extraFieldsData = formData[header];
              let contactExtraFields: any = {};
              for (let field in extraFieldsData) {
                if (extraFieldsData[field] !== '') {
                  contactExtraFields[field] = row[+extraFieldsData[field]];
                }
              }
              contact[header] = contactExtraFields;
            } else {
              contact[header] =
                formData[header] !== ''
                  ? this.filterColumnData(row[+formData[header]])
                  : '';
            }
            var re =
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            //Validate firstname and email_id
            if (
              // (header === 'firstname' && !contact[header]) ||
              header === 'email' &&
              !(re.test(contact[header]) && contact[header])
            ) {
              rowDataHasErrors = true;
            }

            if (rowDataHasErrors) {
              errorCount++;
            }
          }

          //Check for error counts and push data to appropriate array
          if (errorCount === 0) {
            //No errors
            this.successData.push(contact);
          } else if (errorCount > 0) {
            //data contains empty or invalid email
            this.errorData.push(contact);
          }
        }
      });
    }
  }

  saveData() {
    //Save data using the service
    const saveData = {
      successData: this.successData,
      errorData: this.errorData,
    };
    console.log(this.errorData.length);
    console.log(this.successData.length);
    this.loader = true;
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    var userParentId = this.user.id;
    this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
    console.log(this.userAccount.id);
    var useraccountId = this.userAccount.id;
    this.csvImport
      .saveCsv(this.successData, userParentId, useraccountId)
      .subscribe({
        next: (res) => {
          this.loader = false;
          console.log(res);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Csv import successfull',
            showConfirmButton: false,
            timer: 1500,
          });
          this.dialogRef.close('submit');
        },
        error: (err) => {
          this.loader = false;
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Csv import Failed',
            showConfirmButton: false,
            timer: 1500,
          });
          this.dialogRef.close('submit');
        },
      });
  }
  back() {
    this.displayError = false;
    this.successData = [];
    this.errorData = [];
    this.fieldMapForm.reset();
    this.createForm();
    this.parseCSVFileConent();

    //this.fieldMapForm.value.containsHeaders = true;
  }
  editable: boolean = false;
  user = {
    id: undefined,
  };
  userAccount = {
    id: undefined,
  };
  ngOnInit(): void {}
  onSelection(event) {
    if (event.previouslySelectedIndex == 0) {
      this.mapping();
    } else if (event.selectedStep.label == 'Preview And Submit') {
      //this.next();
    }
    console.log(event);
  }
  displayErrorContacts() {
    if (this.errorData.length > 0) {
      if (this.displayError == false) {
        this.displayError = true;
      } else {
        this.displayError = false;
      }
    }
  }
}
