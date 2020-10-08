import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {


  constructor(private router: Router) { }

  navigateToPage(selectedValue: string, routerLink: string) {
    this.router.navigate([routerLink], {
      queryParams: { selected: selectedValue},
    });
  }
}
