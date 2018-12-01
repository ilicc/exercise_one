import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  public url: string; // Current url address

  constructor(
  ) { 
    this.url = window.location.href;
  }

  ngOnInit() {
  }

}
