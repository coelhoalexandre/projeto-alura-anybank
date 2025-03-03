import styled from 'styled-components';
import { Sidebar } from '../../presentation/Sidebar';
import { Account } from '../../presentation/Account';
import { TransactionForm } from '../../presentation/TransactionForm';
import { Statement } from '../../presentation/Statement';
import { ITransaction } from '../../domain/entities/ITransaction';
import { useEffect, useState } from 'react';
import { ListAllTransaction } from '../../domain/useCases/ListAllTransactions';
import { TransactionSupabaseRepository } from '../../infra/supabase/TransactionSupabaseRepository';

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const listTransactions = new ListAllTransaction(
  new TransactionSupabaseRepository()
);

const Home = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    listTransactions.execute().then((data) => setTransactions(data));
  }, []);

  return (
    <>
      <Sidebar />
      <Main>
        <Account />
        <TransactionForm />
      </Main>
      <div>
        <Statement allTransactions={transactions} />
      </div>
    </>
  );
};

export default Home;
