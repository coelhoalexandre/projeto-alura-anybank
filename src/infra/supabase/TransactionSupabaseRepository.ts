import { ITransaction } from '../../domain/entities/ITransaction';
import { ITransactionRepository } from '../../domain/repositories/ITransactionRepository';
import { supabase } from './config';

export class TransactionSupabaseRepository implements ITransactionRepository {
  async create(value: number, typeId: number, userId: string): Promise<void> {
    const { error } = await supabase
      .from('transaction')
      .insert([{ transaction_type_id: typeId, value, user_id: userId }])
      .select();

    if (error) throw error;
  }

  async listAll(): Promise<ITransaction[]> {
    const { data, error } = await supabase
      .from('transaction')
      .select(`*, transaction_type(id, display)`);

    if (error) throw error;

    const result: ITransaction[] = data.map((row) => ({
      id: row.id,
      date: new Date(row.created_at),
      type: row.transaction_type,
      value: row.value,
    }));

    return result;
  }
}
