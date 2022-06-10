import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
@Component({
  selector: 'app-wizard-stepper',
  templateUrl: './wizard-stepper.component.html',
  styleUrls: ['./wizard-stepper.component.scss']
})
export class WizardStepperComponent implements OnInit {
  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };
 
  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
//     toolbarSettings: {
//       toolbarExtraButtons: [
//         { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); } 
//       },
      
//       {
//         text: 'Reset',
//         class: 'btn btn-danger',
//         event: () => {
//           this.resetWizard();
//         }
//     }
//   ]
// }
  };
 
  stepChangedArgs!: StepChangedArgs;
  selectedtheme!: THEME;
  themes = [THEME.default, THEME.arrows, THEME.circles, THEME.dots];
 
  constructor(private ngWizardService: NgWizardService) {
  }
 
  ngOnInit() {
  }
 
  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }
 
  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }
 
  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }
 
  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
    this.stepChangedArgs = args;
  }
 
  isValidTypeBoolean: boolean = true;
 
  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    return true;
  }
 
  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    return of(true);
  }

}
