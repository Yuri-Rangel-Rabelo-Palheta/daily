'use client'

import { useState } from 'react';
import { auth } from '../../lib/firebaseConfig';
import { useRouter } from 'next/navigation'; // Para redirecionamento após cadastro
import Link from 'next/link'; // Importando o Link do Next.js para navegação
import { createUserWithEmailAndPassword } from 'firebase/auth';

const CadastroForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(''); // Limpar qualquer erro anterior

    // Adicionar lógica de cadastro com Firebase aqui
    try {
      console.log('Fazendo o cadastro...');
      //await firebaseConfig.auth().createUserWithEmailAndPassword(email, password);
      await createUserWithEmailAndPassword(auth, email, password);
      // Cadastro realizado com sucesso
      console.log('Cadastro realizado com sucesso!');
      // Redirecionar para a página de dashboard ou para onde desejar após o cadastro
      router.push('/dashboard');
    } catch (error) {
      // Caso ocorra um erro durante o cadastro
      setError('Erro ao cadastrar. Tente novamente.');
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white shadow-lg p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Crie sua Conta</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <button
            className="w-full bg-blue-500 hover:bg-blue-400 text-white rounded-lg py-3 font-semibold"
            type="submit"
          >
            Criar Conta
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-blue-500 hover:underline">
              Faça login aqui.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CadastroForm;
