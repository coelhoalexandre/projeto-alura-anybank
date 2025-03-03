import { ITransactionType } from '../entities/ITransactioType';

export interface ITransactionTypeRepository {
  listAll: () => Promise<ITransactionType[]>;
}
