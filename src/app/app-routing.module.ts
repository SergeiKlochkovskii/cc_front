import { TransactionStatusComponent } from './component/transaction-status/transaction-status.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import { NewTransactionComponent } from './component/new-transaction/new-transaction.component';
import { AppComponent } from './app.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'mainPage', component: MainPageComponent},
  { path: 'newTransaction', component: NewTransactionComponent},
  { path: 'transactionStatus', component: TransactionStatusComponent},
  { path: '**', redirectTo: 'mainPage' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
