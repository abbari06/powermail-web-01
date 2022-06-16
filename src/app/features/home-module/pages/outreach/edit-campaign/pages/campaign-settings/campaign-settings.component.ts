import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-campaign-settings',
  templateUrl: './campaign-settings.component.html',
  styleUrls: ['./campaign-settings.component.scss']
})
export class CampaignSettingsComponent implements OnInit {

 addForm:FormGroup;

  constructor(private fb:FormBuilder) {
    this.addForm = this.fb.group({
     maximumEmailsPerDay:[],
     linkTraking:[],
     EnableTraking:[],
     actions: this.fb.array([]),
     anotherDropdown:[],
     emailBounce:[]
    });
  }
get actions():FormArray{
  return this.addForm.get("actions") as FormArray
}

    newAction():FormGroup{
      return this.fb.group({
        when:"",
        do:"",
        labels:[], 
      })

    }
    addActions(){
      this.actions.push(this.newAction());
    }
    removeActions(i:number) {
      this.actions.removeAt(i);
    }
     
    onSubmit(){
      console.log(this.addForm.value);
    }

  ngOnInit(): void {
    this.addActions()
  }

}
