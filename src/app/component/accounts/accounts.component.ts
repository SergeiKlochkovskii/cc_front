import { DataExchangeService } from '../../service/data-exchange.service';
import { AccountExt } from './../../service/transaction-interface';
import { Component, OnInit } from '@angular/core';
import { TransactionStatusService } from 'src/app/service/transaction.service';
import { Clipboard as cdkClipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accountArr: AccountExt[];
  message = 'Account data';
  showOutput = false;

  constructor(private transactionService: TransactionStatusService, private clb: cdkClipboard,
              private dataExchange: DataExchangeService) { }


  ngOnInit(): void {
    this.message = 'Account data';
    this.transactionService.getAccounts().subscribe(
      (data) => {
        this.accountArr = [];
        this.accountArr.push(...data);
        this.showOutput = true;
      },
      error => {
        this.showOutput = false;
        this.message = error.message;

        if (this.message.indexOf('Http failure') > -1) {
          this.message = 'Host is down, please try later';
        }
      });
  }


  onAccountClick(account: string) {
    this.clb.copy(account);
    this.dataExchange.navigateToPage(account, 'accountInfo');
  }

}
