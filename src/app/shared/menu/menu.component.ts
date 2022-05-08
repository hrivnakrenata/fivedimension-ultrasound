import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {

  @Input() currentPage: string = '';
  @Input() loggedInUser?: firebase.default.User | null;
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  @Output() onCloseSideNav: EventEmitter<boolean> = new EventEmitter();
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  close(logout?: boolean) {
    this.onCloseSideNav.emit(true);
    if (logout === true) {
      this.onLogout.emit(logout);
    }
  }
}
