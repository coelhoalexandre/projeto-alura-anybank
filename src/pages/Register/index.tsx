import { useState } from 'react';
import { CreateUser } from '../../domain/useCases/CreateUser';
import { UserSupabaseRepository } from '../../infra/supabase/UserSupabaseRepository';
import { toast } from 'react-toastify';
import {
  Figure,
  Form,
  FormActions,
  Heading,
  Image,
} from '../../components/Form';
import { Fieldset } from '../../components/Fieldset';
import { FormLabel } from '../../components/FormLabel';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';

const createUser = new CreateUser(new UserSupabaseRepository());

export const Register = () => {
  const blankUser = { name: '', email: '', password: '' };
  const [user, setUser] = useState(blankUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const registerUser = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      await createUser.execute(user);
      toast.success('Usuário registrado com sucesso!');
      setUser(blankUser);
    } catch (error) {
      console.log('Falha ao cadastrar usuário', error);
      toast.error('Falha no engano!');
    }
  };

  return (
    <>
      <Figure>
        <Image src='/imgs/register.png' />
      </Figure>
      <div>
        <Heading>Cadastro</Heading>
        <p>
          Preencha os campos abaixo para
          <br />
          criar sua conta corrente!
        </p>
        <Form onSubmit={registerUser}>
          <Fieldset>
            <FormLabel>Nome</FormLabel>
            <TextField
              name='name'
              placeholder='Digite seu nome completo'
              value={user.name}
              onChange={handleChange}
              required
            />
          </Fieldset>
          <Fieldset>
            <FormLabel>Email</FormLabel>
            <TextField
              name='email'
              type='email'
              placeholder='Digite seu email'
              value={user.email}
              onChange={handleChange}
              required
            />
          </Fieldset>
          <Fieldset>
            <FormLabel>Senha</FormLabel>
            <TextField
              name='password'
              type='password'
              placeholder='Digite sua senha'
              value={user.password}
              onChange={handleChange}
              required
            />
          </Fieldset>
          <FormActions>
            <Button type='submit'>Abrir conta</Button>
          </FormActions>
        </Form>
      </div>
    </>
  );
};
