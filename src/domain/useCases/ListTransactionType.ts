import { ITransactionTypeRepository } from '../repositories/ITransactionTypeRepository';

export class ListTransactionType {
  constructor(private repository: ITransactionTypeRepository) {}

  async execute() {
    return this.repository.listAll();
  }
}
