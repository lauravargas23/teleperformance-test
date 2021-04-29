import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService],
})
export class AppComponent {

  title = 'teleperformance-apis';
  authorized: boolean = false;

  constructor(public loginService: LoginService) { }

  logout() {
    this.loginService.logout();
  }

}
