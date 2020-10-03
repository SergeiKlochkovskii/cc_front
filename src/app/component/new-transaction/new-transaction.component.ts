import { LoadTransService} from './../../service/load-trans.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionPayload } from 'src/app/service/transaction-interface';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent implements OnInit {

  newTransactionForm: FormGroup;
  message = 'Enter data';

  constructor(private loadTransaction: LoadTransService) { }

  ngOnInit(): void {

    this.newTransactionForm = new FormGroup({
      reference: new FormControl({ value: null, disabled: false }),
      transactionDate: new FormControl({ value: null, disabled: true }),
      iban: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      fee: new FormControl(null),
      description: new FormControl(null)
    });

  }


  onSubmit() {
    const tpl: TransactionPayload = {
      reference: this.newTransactionForm.get('reference').value,
      accountIban: this.newTransactionForm.get('iban').value,
      amount: this.newTransactionForm.get('amount').value,
      fee: this.newTransactionForm.get('fee').value,
      description: this.newTransactionForm.get('description').value
    };

    this.loadTransaction.storeTransaction(tpl).subscribe(
      (data: TransactionPayload) => {
        if (data.status !== 'OK') {
          this.revertTransactionData(tpl);
          this.message = `Status:  ${data.status}`;
        }
        else {
          this.newTransactionForm.get('reference').setValue('');
          this.newTransactionForm.get('transactionDate').setValue('');
          this.newTransactionForm.get('iban').setValue('');  // What is incorrect
          this.newTransactionForm.get('amount').setValue('');
          this.newTransactionForm.get('fee').setValue('');
          this.newTransactionForm.get('description').setValue('');
          this.message = `Status: ${data.status},   Reference: ${data.reference},  Date: ${data.date}`;
        }

      },
      error => {
        let em = error.message;
        this.revertTransactionData(tpl);
        if (em.indexOf('Http failure') > -1) {
          em = 'Host is down, please try later';
        }


        this.message = em;
      }
    );

  }

  revertTransactionData(tpl: TransactionPayload) {
    this.newTransactionForm.get('reference').setValue(tpl.reference);
    this.newTransactionForm.get('transactionDate').setValue(tpl.date);
    this.newTransactionForm.get('iban').setValue(tpl.accountIban);
    this.newTransactionForm.get('amount').setValue(tpl.amount);
    this.newTransactionForm.get('fee').setValue(tpl.fee);
    this.newTransactionForm.get('description').setValue(tpl.description);

  }

}

