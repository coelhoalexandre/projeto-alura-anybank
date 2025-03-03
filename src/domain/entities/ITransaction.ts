import { ITransactionType } from './ITransactioType';

export interface ITransaction {
  id: number;
  value: number;
  type: ITransactionType;
  date: Date;
}
