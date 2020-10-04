import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlConstService } from './url-const.service';
import { Injectable } from '@angular/core';
import { TransactionPayload, TransactionStatusRequest, TransactionStatusResponse } from './transaction-interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionStatusService {

  constructor(private http: HttpClient, private urlConst: UrlConstService) { }


  public getTransStatus(tsRequest: TransactionStatusRequest): Observable<TransactionStatusResponse> {
    const headers = new HttpHeaders()
      .append('X-Requested-With', 'XMLHttpRequest');

    return this.http.post<TransactionStatusResponse>(this.urlConst.baseUrl + this.urlConst.postTransStatus, tsRequest,
      { headers, withCredentials: true });
  }

  public storeTransaction(payload: TransactionPayload): Observable<TransactionPayload> {
    const headers = new HttpHeaders()
      .append('X-Requested-With', 'XMLHttpRequest');

    return this.http.post<TransactionPayload>(this.urlConst.baseUrl + this.urlConst.postTransUrl, payload,
      { headers, withCredentials: true });
  }

  public getAccountInfo(account: string, order: string): Observable <Array<TransactionPayload>> {
    const headers = new HttpHeaders()
      .append('X-Requested-With', 'XMLHttpRequest');

    return this.http.get<Array<TransactionPayload>>(`${this.urlConst.baseUrl}${this.urlConst.postTransUrl}/${account}`,
    {
      headers,
      withCredentials: true,
      params: {amount_sort: order}
    });

  }

}
