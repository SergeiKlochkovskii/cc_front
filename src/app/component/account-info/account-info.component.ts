import { TransactionStatusService } from './../../service/transaction.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TransactionPayload } from 'src/app/service/transaction-interface';


@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  message = 'Enter data';
  statusChanged = false;
  accountInfoArray: TransactionPayload[];
  showOutput = false;

  accountStatusForm: FormGroup;


  constructor(private transactionService: TransactionStatusService) { }

  ngOnInit(): void {
    this.accountStatusForm = new FormGroup({
      iban: new FormControl(null, [Validators.required]),
      order: new FormControl('')
    });
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
}

