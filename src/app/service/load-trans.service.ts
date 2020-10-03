
import { UrlConstService } from './url-const.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TransactionPayload } from './transaction-interface';

@Injectable({
  providedIn: 'root'
})
export class LoadTransService {

  constructor(private http: HttpClient, private urlConst: UrlConstService) { }

  public storeTransaction(payload: TransactionPayload): Observable<TransactionPayload> {
    const headers = new HttpHeaders()
      .append('X-Requested-With', 'XMLHttpRequest');

    return this.http.post<TransactionPayload>(this.urlConst.baseUrl + this.urlConst.postTransUrl, payload,
      { headers, withCredentials: true });
  }

}


