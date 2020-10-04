import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClipboardModule as CdkClipboard} from '@angular/cdk/clipboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewTransactionComponent } from './component/new-transaction/new-transaction.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TransactionStatusComponent } from './component/transaction-status/transaction-status.component';
import { AccountInfoComponent } from './component/account-info/account-info.component';
import { AccountsComponent } from './component/accounts/accounts.component';

@NgModule({
  declarations: [
    AppComponent,
    NewTransactionComponent,
    MainPageComponent,
    TransactionStatusComponent,
    AccountInfoComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    CdkClipboard,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
