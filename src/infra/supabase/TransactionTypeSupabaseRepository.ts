import { ITransactionType } from '../../domain/entities/ITransactioType';
import { ITransactionTypeRepository } from '../../domain/repositories/ITransactionTypeRepository';
import { supabase } from './config';

export class TransactionTypeSupabaseRepository
  implements ITransactionTypeRepository
{
  constructor() {}

  async listAll(): Promise<ITransactionType[]> {
    const { data, error } = await supabase.from('transaction_type').select('*');

    if (error) throw error;

    return data || [];
  }
}
