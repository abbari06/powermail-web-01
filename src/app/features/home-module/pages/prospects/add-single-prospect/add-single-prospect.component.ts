import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProspectLabelService } from 'src/app/core/services/prospect-label/prospect-label.service';
import { payload } from '../contacts-list/modals/payload-modal';
import { ProspectesService } from 'src/app/core/services/prospectus-services/prospectes.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-add-single-prospect',
  templateUrl: './add-single-prospect.component.html',
  styleUrls: ['./add-single-prospect.component.scss'],
})
export class AddSingleProspectComponent implements OnInit {
  previousLabels = new FormControl();
  actionButton = 'Save';
  setSelect = true;
  heading = 'Add New Contact';
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private formBuilder: FormBuilder,
    private prospectLabelService: ProspectLabelService,
    private prospectsService: ProspectesService,
    private dialogRef: MatDialogRef<AddSingleProspectComponent>
  ) {
    this.fetchLabels();
    if (editData) {
      this.setSelect = false;
      this.prospectLabels();
      this.getProspectData();
    }
  }
  user = {
    id: undefined,
  };
  userAccount = {
    id: undefined,
  };
  allLabels = [];
  payload = new payload();

  ngOnInit(): void {
    //this.check();
    //this.getProspectData();
    if (this.editData) {
    }
  }
  addContact = this.formBuilder.group({
    id: [],
    userAccountId: [],
    userId: [],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    company: [''],
    position: [''],
    labels: [],
  });
  fetchLabels() {
    this.payload.limit = 50;
    this.payload.page = 0;
    this.payload.orderBy = '-name';
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
  addSingleContact() {
    if (this.editData) {
      this.updateProspect();
    } else {
      this.setSelect = true;
      this.user = JSON.parse(localStorage.getItem('user'));
      this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
      var userId = this.user.id;
      var userAccountId = this.userAccount.id;
      // this.addContact.setValue({ userId: userId, userAccountId: userAccountId });
      this.addContact.controls['userId'].setValue(userId);
      this.addContact.controls['userAccountId'].setValue(userAccountId);
      this.addContact.controls['labels'].setValue(this.previousLabels.value);
      console.log(this.addContact.value);
      this.prospectsService.addSingleProspect(this.addContact.value).subscribe({
        next: (res: any) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Contact Added Successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          this.dialogRef.close('submit');
        },
        error: (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Contact Add Failed!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.dialogRef.close('submit');
        },
      });
    }
  }

  selectedProspectLabels = [];
  prospectLabels() {
    console.log(this.editData);
    this.previousLabels.setValue(this.editData.labels);
    console.log(this.previousLabels);
  }

  getProspectData() {
    console.log(this.editData);
    if (this.editData) {
      this.actionButton = 'Update';
      this.heading = 'Edit Your Contact';
      this.addContact.controls['firstName'].setValue(this.editData.firstname);
      this.addContact.controls['lastName'].setValue(this.editData.lastname);
      this.addContact.controls['userId'].setValue(this.editData.userId);
      this.addContact.controls['id'].setValue(this.editData.id);
      this.addContact.controls['userAccountId'].setValue(
        this.editData.userAccountId
      );
      this.addContact.controls['email'].setValue(this.editData.email);
      this.addContact.controls['company'].setValue(this.editData.company);
      this.addContact.controls['position'].setValue(this.editData.position);
    }
    console.log(this.addContact.value);
  }
  updateProspect() {
    if (this.selectedOptions) {
      this.addContact.controls['labels'].setValue(this.previousLabels.value);
    } else if (!this.selectedOptions) {
      this.addContact.controls['labels'].setValue(this.editData.labels);
    }
    this.prospectsService.editProspect(this.addContact.value).subscribe({
      next: (res: any) => {
        // this.totalAccounts.push(res);
        console.log(res);
      },
      error: (error: any) => {
        //alert(error);
        console.log(error);
      },
    });
  }
  compareFn(o1: any, o2: any): boolean {
    // if possible compare by object's name, and not by reference.
    return o1 && o2 ? o1.name === o2.name : o2 === o2;
    //if (o1.name === o2.name) return true;
  }
  selectedOptions = false;
  changeClient(event) {
    console.log(event);
    this.selectedOptions = true;
    console.log(this.previousLabels.value);
    for (let i = 0; i < event.length; i++) {
      this.selectedProspectLabels.push(event[i].name);
    }
  }
  onPreviousLabelRemoved(cat: string) {
    const categories = this.previousLabels.value as string[];
    this.removeFirst(categories, cat);
    // To trigger change detection
    // this.selectedProspectLabels
  }
  private removeFirst(categories, cat): void {
    this.selectedOptions = true;
    const index = categories.indexOf(cat);
    if (index !== -1) {
      categories.splice(index, 1);
      this.previousLabels.setValue(categories);
    }
  }
}
