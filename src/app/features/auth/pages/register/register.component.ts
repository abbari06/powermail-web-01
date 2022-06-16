import { Component, OnInit,} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  message:string;
  status:string;
  ifRegistered=false;
    constructor( private formBuilder: FormBuilder,private authService:AuthService,) { }
  ngOnInit(): void {
  }
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    phone: ['',Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
    company: [''],
    password: ['', [Validators.required, Validators.minLength(6)]],
    accounttype: ['client'],
    creationId:["order_page"]
  });
  onChangeEventFunc(event){
    if(event.checked){
      this.registerForm.value.accounttype="agency";
    }
  }
  registerUserOrAgency(){
    this.authService.register(this.registerForm.value);
    console.log(this.registerForm.value)
}

}