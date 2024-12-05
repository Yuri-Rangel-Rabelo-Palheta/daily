'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig'; // Importando a configuração do Firebase
import MenuSuperior from '@/components/MenuSuperior';  // Adicione seu MenuSuperior
import Rodape from '@/components/Rodape';  // Adicione seu Rodape

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Verifica se o usuário já está autenticado, redirecionando-o para o dashboard
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/dashboard'); // Se o usuário estiver logado, redireciona para o dashboard
      }
    });

    return () => unsubscribe();  // Limpeza do observador de autenticação
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Realiza o login com email e senha no Firebase
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');  // Redireciona para o Dashboard após login bem-sucedido
    } catch (error) {
      setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MenuSuperior />
      
      <main className="flex-grow bg-gray-100 p-6">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Login</h2>

          {errorMessage && (
            <div className="text-red-500 text-center mb-4">{errorMessage}</div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700">Senha</label>
              <input
                id="password"
                type="password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-400 text-white rounded-lg px-4 py-2 mt-6"
            >
              Entrar
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{' '}
              <a href="/register" className="text-blue-500">Crie uma conta</a>
            </p>
          </div>
        </div>
      </main>

      <Rodape />
    </div>
  );
};

export default LoginPage;
