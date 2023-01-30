import { Component, OnInit,} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { StripeComponent } from 'src/app/features/home-module/pages/stripe/stripe.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  message:string;
  status:string;
  loading=false;
    constructor( private formBuilder: FormBuilder,private authService:AuthService,private router :Router, 
      public dialog: MatDialog) { }
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
  openDialogue(email): void {
    const dialogRef = this.dialog.open(StripeComponent, {
      disableClose: true,
      data:email,
      width: '95%',
      height: '95%',
      
    });
    dialogRef.afterClosed().subscribe((val)=>{
      if(val){
       // this.router.navigate(["auth"])
      }
      })
  }
  registerUserOrAgency(){
    this.loading=true;
    this.authService.register(this.registerForm.value).subscribe({
      next: (res: any) => {
        this.loading=false;
        this.openDialogue(this.registerForm.value.email);
        console.log(res);
        this.router.navigate(['auth'], { state: { data: res } });
      },
      error: (error: any) => {
        this.loading=false;
        console.log(error);
      },
    });
    console.log(this.registerForm.value)
}

}