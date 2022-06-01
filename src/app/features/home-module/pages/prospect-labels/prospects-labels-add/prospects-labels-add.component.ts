import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-prospects-labels-add',
  templateUrl: './prospects-labels-add.component.html',
  styleUrls: ['./prospects-labels-add.component.scss']
})
export class ProspectsLabelsAddComponent implements OnInit {
  addLAbel: string;
  addDesc:string;
  pickColor:string;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void { }
  AddLabelForm = this.formBuilder.group({
    addLAbel: ['', [Validators.required]],
    addDesc: ['', [Validators.required]],
    pickColor: ['', [Validators.required]],

  });


}

