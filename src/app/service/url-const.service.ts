import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlConstService {

  readonly baseUrl: string =
    `http://${window.location.host.split(':')[0]}:8080`;

  readonly postTransUrl: string = '/transaction';
  readonly postTransStatus: string = '/transaction/status';


  constructor() { }
}
