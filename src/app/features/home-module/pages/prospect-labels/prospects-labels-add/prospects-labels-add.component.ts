import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProspectLabelService } from 'src/app/core/services/prospect-label/prospect-label.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-prospects-labels-add',
  templateUrl: './prospects-labels-add.component.html',
  styleUrls: ['./prospects-labels-add.component.scss'],
})
export class ProspectsLabelsAddComponent implements OnInit {
  backgroundColor: any;
  actionButton = 'Save';

  user = {
    id: undefined,
  };
  userAccount = {
    id: undefined,
  };
  labelId: number;
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<ProspectsLabelsAddComponent>,
    private prospectLabelService: ProspectLabelService
  ) {}

  ngOnInit(): void {
    this.getRowData();
  }
  AddLabelForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });
  // @param backgroundColor
  setColor(background, event) {
    this.backgroundColor = event;
    console.log(this.backgroundColor);
  }
  getRowData() {
    console.log(this.editData);
    if (this.editData) {
      this.actionButton = 'Update';
      this.AddLabelForm.controls['name'].setValue(this.editData.name);
      this.AddLabelForm.controls['description'].setValue(
        this.editData.description
      );
      this.user.id = this.editData.userId;
      this.userAccount.id = this.editData.userAccountId;
      this.backgroundColor = this.editData.colorHex;
      this.labelId = this.editData.id;
    }
  }
  updateLabels() {
    this.prospectLabelService
      .updateLabels(
        this.user.id,
        this.userAccount.id,
        this.labelId,
        this.AddLabelForm.value.name,
        this.AddLabelForm.value.description,
        this.backgroundColor
      )
      .subscribe({
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

  setLabels() {
    if (this.editData) {
      this.updateLabels();
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
      var userId = this.user.id;
      this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
      var userAccountId = this.userAccount.id;
      this.prospectLabelService
        .addLabels(
          userId,
          userAccountId,
          this.AddLabelForm.value.name,
          this.AddLabelForm.value.description,
          this.backgroundColor
        )
        .subscribe({
          next: (res: any) => {
            // this.totalAccounts.push(res);
            console.log(res);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Label Added successfully',
              showConfirmButton: false,
              timer: 1500,
            });
            this.dialogRef.close('result');
          },
          error: (error: any) => {
            //alert(error);
            console.log(error);
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Label Add Failed',
              showConfirmButton: false,
              timer: 1500,
            });
            this.dialogRef.close('result');
          },
        });
    }
  }
}
