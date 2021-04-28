import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare var M: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SignupService],
})
export class SignupComponent implements OnInit {

  constructor(public signupService: SignupService, private router: Router) { }

  ngOnInit(): void {
  }

  signUpAction(form: NgForm) {
    if (!form.value.email || !form.value.password) {
      M.toast({ html: 'Empty fields' });
    } else if (form.value.password != form.value.passwordRepeat) {
      M.toast({ html: 'Passwords do not match' });
    } else {
      this.signupService.signup(form.value)
        .subscribe(res => {
          if (res) {
            M.toast({ html: 'User registered, please log in' });
            this.clean(form);
          }
        }, (err) => {
          M.toast({ html: 'Email previously registered' });
        });
    }
  }

  clean(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

}
