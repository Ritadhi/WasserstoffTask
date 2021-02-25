import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

  userName: String;

  errorMessage: boolean = false;

  constructor(private _user: UserService, private _router: Router) { }

  ngOnInit() {
  }

  goToDashboard() {
    if (this.userName) {
      this._user.user({ userName: this.userName })
        .subscribe(data => this.addData(data))
    } else {
      this.errorMessage = true;
    }
  }

  addData(data) {
    this._router.navigate(['/dashboard'], {
      queryParams: { userName: data.userName }
    });
  }

}
