import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-bar',
  templateUrl: './text-bar.component.html',
  styleUrls: ['./text-bar.component.css']
})
export class TextBarComponent implements OnInit {
  @Input() tooltip:string;

  constructor() { }

  ngOnInit() {
  }

}
