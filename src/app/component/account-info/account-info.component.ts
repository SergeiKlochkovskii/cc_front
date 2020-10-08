import { DataExchangeService } from './../../service/data-exchange.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionStatusService } from './../../service/transaction.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionPayload } from 'src/app/service/transaction-interface';


@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit, OnDestroy {

  message = 'Enter data';
  statusChanged = false;
  accountInfoArray: TransactionPayload[];
  showOutput = false;

  accountStatusForm: FormGroup;
  accountParamSubscription: Subscription = null;

  constructor(private transactionService: TransactionStatusService, private route: ActivatedRoute,
              private dataExchange: DataExchangeService) { }

  ngOnDestroy(): void {
    if (this.accountParamSubscription != null) {
      this.accountParamSubscription.unsubscribe();
    }
  }


  ngOnInit(): void {
    this.accountStatusForm = new FormGroup({
      iban: new FormControl(null, [Validators.required]),
      order: new FormControl('')
    });

    this.accountParamSubscription =
      this.route.queryParams.subscribe(params => {
        const account = params['selected'];
        if (account != undefined) {
          this.accountStatusForm.get('iban').setValue(account);
          this.onSubmit();
        }
      }
      );
  }


  onSubmit() {
    this.message = 'Enter data';
    this.showOutput = false;
    this.transactionService.getAccountInfo(
      this.accountStatusForm.get('iban').value,
      this.accountStatusForm.get('order').value
    ).subscribe(
      (data) => {
        this.showOutput = true;
        if (data.length === +1 && data[0].status === 'Error') {
          this.message = `${data[0].description},  please try again`;
          this.showOutput = false;
        }
        this.accountInfoArray = [];
        this.accountInfoArray.push(...data);
      },
      error => {
        this.message = error.message;
        if (this.message.indexOf('Http failure') > -1) {
          this.message = 'Host is down, please try later';
        }
      }

    );
    this.statusChanged = true;
  }

  hideStatus() {
    this.statusChanged = false;
  }

  onRowClick($event) {
  }

  onRefClick(reference: string) {

    this.dataExchange.navigateToPage(reference, 'transactionStatus');

  }
}

