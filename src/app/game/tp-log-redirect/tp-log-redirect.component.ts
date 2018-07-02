import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tp-log-redirect',
  templateUrl: './tp-log-redirect.component.html',
  styleUrls: ['./tp-log-redirect.component.css']
})
export class TpLogRedirectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.location.href = "https://docs.google.com/spreadsheets/d/1g8X_ZcOFw4J5ipngjgoUZi6KeQM_YggXH1wdsz0gjLc/";
  }

}
