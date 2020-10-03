import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlConstService } from './url-const.service';
import { Injectable } from '@angular/core';
import { TransactionStatusRequest, TransactionStatusResponse } from './transaction-interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionStatusService {

  constructor(private http: HttpClient, private urlConst: UrlConstService) { }


  getTransStatus(tsRequest: TransactionStatusRequest): Observable<TransactionStatusResponse> {
    const headers = new HttpHeaders()
      .append('X-Requested-With', 'XMLHttpRequest');

    return this.http.post<TransactionStatusResponse>(this.urlConst.baseUrl + this.urlConst.postTransStatus, tsRequest,
      { headers, withCredentials: true });
  }
}
