import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../service/services.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide=true
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ServicesService,
    private router: Router,
    private toastr : ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe(
        {
          next: (result) => {
            localStorage.setItem('authToken', result.response.token);
            const userInfo = JSON.stringify(result.response.userData);
            localStorage.setItem('logedinInfo', userInfo);
            this.router.navigate(['']);
            // alert(result.message);
            this.toastr.success(result.message)

          },
          error: (err) => {
            // alert(err.error);
            this.toastr.error(err.error)

          }
        }
      );
    }
  }
}
