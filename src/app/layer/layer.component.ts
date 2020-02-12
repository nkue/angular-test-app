import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.css']
})
export class LayerComponent implements OnInit {

  @Input() public url;
  @Input() public handleClose;

  constructor() { }

  ngOnInit() {
  }

}
