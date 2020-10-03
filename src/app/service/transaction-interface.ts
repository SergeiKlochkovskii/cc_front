export interface TransactionPayload {
  reference?: string;
  date?: Date;
  accountIban: string;
  account_iban?: string;
  amount: number;
  fee?: number;
  description?: string;
  status?: string;
}

export interface TransactionStatusRequest {
  reference: string;
  channel: string;
  date?: Date;
}

export interface TransactionStatusResponse {
  reference: string;
  status: string;
  amount: number;
  fee?: number;
}
