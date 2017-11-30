import { EventEmitter, Output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.html'
})
export class AppHeader {

  @Output() moreButtonClick = new EventEmitter();
  @Output() titleClick = new EventEmitter();

  constructor() {

  }

  onMoreButtonClick($event) {
    this.moreButtonClick.emit($event);
  }

  onTitleClick() {
    this.titleClick.emit('home');
  }

}
