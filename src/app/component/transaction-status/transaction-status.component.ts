import { TransactionStatusService } from '../../service/transaction.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TransactionStatusRequest, TransactionStatusResponse } from 'src/app/service/transaction-interface';

@Component({
  selector: 'app-transaction-status',
  templateUrl: './transaction-status.component.html',
  styleUrls: ['./transaction-status.component.css']
})
export class TransactionStatusComponent implements OnInit {

  transactionStatusForm: FormGroup;
  message = 'Enter data';
  channels: string[] = ['CLIENT', 'ATM', 'INTERNAL'];
  statusChanged = false;

  constructor(private transStatus: TransactionStatusService) { }

  ngOnInit(): void {

    this.transactionStatusForm = new FormGroup({
      reference: new FormControl({ value: null, disabled: false }, [Validators.required]),
      transactionDate: new FormControl({ value: null, disabled: false }),
      channel: new FormControl(this.channels[0], [Validators.required]),
      // Output
      // outReference: new FormControl(''),
      outStatus: new FormControl(''),
      outAmount: new FormControl(''),
      outFee: new FormControl('')
      // new FormControl(''),
    });

  }

  onSubmit() {

    const strChannel = this.transactionStatusForm.get('channel').value.value;
    const tsRequest: TransactionStatusRequest = {
      reference: this.transactionStatusForm.get('reference').value,
      channel: this.transactionStatusForm.get('channel').value,
      requestedDate: this.transactionStatusForm.get('transactionDate').value
    };

    this.transStatus.getTransStatus(tsRequest).subscribe(
      (data: TransactionStatusResponse) => {

        this.transactionStatusForm.get('outStatus').setValue(data.status);
        this.transactionStatusForm.get('outAmount').setValue(data.amount);
        this.transactionStatusForm.get('outFee').setValue(data.fee);
        this.statusChanged = true;
      },
      error => {
        this.message = error.message;
        if (this.message.indexOf('Http failure') > -1) {
          this.message = 'Host is down, please try later';
        }
      }

    );

  }

  hideStatus() {
    this.statusChanged = false;
  }


}
