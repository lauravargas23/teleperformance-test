import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {

  constructor(public loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  loginAction(form: NgForm) {
    if (!form.value.email || !form.value.password) {
      M.toast({ html: 'Empty fields' });
    } else {
      this.loginService.login(form.value)
        .subscribe(res => {
          if (res.token) {
            const token = res.token;
            const expiresIn = res.expiresIn;
            this.loginService.saveToken(token, expiresIn);
            this.clean(form);
            M.toast({ html: 'Correct' });
            this.navigateTo('/technologies');
          }
        }, (err) => {
          M.toast({ html: 'Incorrect email or password' });
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
