import { ITransactionRepository } from '../repositories/ITransactionRepository';

export class ListAllTransaction {
  constructor(private repository: ITransactionRepository) {}

  async execute() {
    return this.repository.listAll();
  }
}
