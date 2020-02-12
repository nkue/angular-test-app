import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-tile',
  templateUrl: './image-tile.component.html',
  styleUrls: ['./image-tile.component.css']
})
export class ImageTileComponent implements OnInit {

  @Input() public image;
  @Input() public onClick;

  public doStuff = (event: MouseEvent) => {
    event.preventDefault();
    this.onClick(this.image);
  }

  constructor() { }

  ngOnInit() {
  }
}
