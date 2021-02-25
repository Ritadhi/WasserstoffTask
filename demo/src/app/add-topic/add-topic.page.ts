import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.page.html',
  styleUrls: ['./add-topic.page.scss'],
})
export class AddTopicPage implements OnInit {

  userName: String;
  errorMessage: boolean = false;
  content: string;
  color: string;
  topic: string;

  output: Array<any>;

  index: number;

  levels: Array<any> = [
    { name: "UNDERSTOOD", color: "green", value: 4 },
    { name: "SOMEWHAT UNDERSTOOD", color: "yellow", value: 3 },
    { name: "NOT CLEAR", color: "blue", value: 2 },
    { name: "WHAT RUBBISH", color: "red", value: 1 }
  ]

  constructor(private _activatedRoute: ActivatedRoute, private _user: UserService, private _router: Router, private sanitizer: DomSanitizer) {
    this._activatedRoute.queryParams.subscribe((data) => { this.getData(data) });
  }

  getData(data) {
    this.userName = data.userName;
    if (!this.userName) {
      this.errorMessage = true;
    }
  }

  ngOnInit() {
  }

  onChangeModel(newValue) {
    this.splitFunction(this.content);
  }

  splitFunction(string) {
    var strArr = string.split('');
    var delimeter = [",", "-", "(", ")", "{", "}", "[", "]", ".", "/", "'", "\"", "\\", "/", ";", ":", "?", ".", "|", "\n"];
    var newArr = [];
    var ptr = 0;
    strArr.forEach((val, i) => {
      if (delimeter.includes(val)) {
        var strPart = [];
        for (ptr; ptr <= i; ptr++) {
          strPart.push(strArr[ptr]);
        }
        strPart.push(strPart[ptr]);
        newArr.push(strPart.join(''));
      }
    })
    var strPart = [];   
    for(ptr; ptr<strArr.length; ptr++) {
        strPart.push(strArr[ptr]);
    }
    newArr.push(strPart.join(''));
    this.output = newArr.filter(Boolean);
    this.output.forEach((val, i) => {
      const ind = i%4;
      this.output[i] = { value: this.levels[ind].value, out: val, color: this.levels[ind].color }
    })
  }

  set(i) {
    this.index = i;
    this.color = this.output[i].color;
  }

  setColor(color, value) {
    this.output[this.index].color = color;
    this.output[this.index].value = value;
  }

  goToAddTopic() {
    var progress = 0;
    this.output.forEach(val => progress += val.value);
    this._user.addTopic({topic: this.topic, score: Math.round(progress*100/(4*this.output.length)), userName: this.userName, output: this.output})
    .subscribe(data => this.goToDashboard(data))
  }

  goToDashboard(data) {
    this._router.navigate(['/dashboard'], {
      queryParams: { userName: data.userName }
    });
  }

  delimeterColor(string) {
    var delimeter = [",", "-", "(", ")", "{", "}", "[", "]", ".", "/", "'", "\"", "\\", "/", ";", ":", "?", ".", "|", "\n"];
    if(delimeter.includes(string[string.length-1])) {
      var newStr = string.split('');
      newStr.pop();
      return this.sanitizer.bypassSecurityTrustHtml(newStr.join('') + `<span style="color: black">` + string[string.length-1] + `</span>`);
    } else return string;
  }

}
