import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../service/services.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  otpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ServicesService,
    private router: Router,
    private toastr:ToastrService
  ) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
    });
  }

  onSubmit() {
    if (this.otpForm.valid) {
      console.log('OTP Submitted:', this.otpForm.value.otp);
      this.service.verifyUser(this.otpForm.value.otp).subscribe({
        next: (res) => {
          this.router.navigateByUrl('login');
          this.toastr.success("OTP Verified")
        },
        error: (err) => {
          // alert(err.error);
          this.toastr.warning(err.error)
        }
      })
    } else {
      console.error('Invalid OTP');
    }
  }
}
