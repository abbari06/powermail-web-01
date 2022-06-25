import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss'],
})
export class SetNewPasswordComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  confirm = false;
  isValidToken = false;
  token = '';
  email = '';

  ngOnInit(): void {
    console.log(this.route.queryParams);
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.token = params.resettoken;
      this.authService.checkResetToken(this.token).subscribe({
        next: (res: any) => {
          console.log(res);
          this.token = res.headers.get('Authorization');
          console.log(this.token);
          this.isValidToken = true;
          this.email = res.body.email;
        },
        error: (error: any) => {
          //alert(error);
          console.log(error);
        },
      });
    });
  }
  ResetPasswordForm = this.formBuilder.group({
    setNewPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmNewPassword: ['', [Validators.required]],
  });
  set() {
    var data = {
      email: this.email,
      password: this.ResetPasswordForm.value.setNewPassword,
    };
    this.authService.setNewPassword(data, this.token);
  }
  confirmPassword() {
    if (
      this.ResetPasswordForm.value.setNewPassword ===
      this.ResetPasswordForm.value.confirmNewPassword
    ) {
      this.confirm = true;
    } else {
      this.confirm = false;
    }
  }
}
