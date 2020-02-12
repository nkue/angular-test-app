import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() public page;
  @Input() public onPreviousClick;
  @Input() public onNextClick;
  @Input() public onChange;
  @Input() public showPreviousButton;
  @Input() public showNextButton;

  constructor() { }

  ngOnInit() {
  }

}
