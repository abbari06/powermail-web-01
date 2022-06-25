import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-single-prospect',
  templateUrl: './add-single-prospect.component.html',
  styleUrls: ['./add-single-prospect.component.scss'],
})
export class AddSingleProspectComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}
  addContact = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    company: [''],
    position: [''],
    labels: [''],
  });
}
