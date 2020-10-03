import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  welcomeMessage = 'Welcome to the simple transaction service application';
  constructor() { }

  ngOnInit(): void {
  }

}
