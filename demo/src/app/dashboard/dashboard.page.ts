import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  topic: Array<any> = [];
  userName: String;
  errorMessage: boolean = false;

  constructor(private _activatedRoute: ActivatedRoute, private _user: UserService, private _router: Router) {
    this._activatedRoute.queryParams.subscribe((data) => { this.getData(data) });
  }

  getData(data) {
    this._user.user({ userName: data.userName })
      .subscribe(data => this.addData(data));
  }

  addData(data) {
    this.topic = data.topic;
    this.userName = data.userName;
  }

  goToAddTopic() {
    if(this.userName) {
      this._user.user({ userName: this.userName })
      .subscribe(data => this.addDataToAddTopic(data))
    } else {
      this.errorMessage = true;
    }
  }

  addDataToAddTopic(data) {
    this._router.navigate(['/add-topic'], {
      queryParams: { userName: data.userName }
    });
  }

  ngOnInit() {
  }

}
