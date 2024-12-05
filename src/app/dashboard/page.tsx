'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Alterado para 'next/navigation'
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig'; // Importando a configuração do Firebase
import MenuSuperior from '@/components/MenuSuperior';
import Rodape from '@/components/Rodape';
import Link from 'next/link';
import ListaDiaristas from '@/components/ListaDiaristas';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();  // Use Router do Next.js para navegação

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');  // Redireciona para o login se o usuário não estiver autenticado
      } else {
        setUser(user);  // Define o usuário autenticado
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!user) {
    return <p>Carregando...</p>;  // Exibe uma mensagem de carregamento enquanto aguarda a verificação
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MenuSuperior />

      <main className="flex-grow bg-gray-100 p-6">
        <h2 className="text-3xl font-semibold text-gray-800">Bem-vindo ao seu Dashboard!</h2>
        <p className="text-gray-700 mt-4">
          Aqui você pode acessar suas informações, gerenciar seu perfil e configurações.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-600">Seu Perfil</h3>
            <p className="mt-2 text-gray-700">Gerencie suas informações pessoais.</p>
            <Link href="/dashboard/diarista" className="text-blue-500 mt-4 inline-block">Ir para o Perfil</Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-600">Configurações</h3>
            <p className="mt-2 text-gray-700">Altere suas preferências e configurações do sistema.</p>
            <Link href="/dashboard/diarista/modificar" className="text-blue-500 mt-4 inline-block">Ir para Configurações</Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-600">Relatórios</h3>
            <p className="mt-2 text-gray-700">Acesse e gere relatórios importantes.</p>
            <Link href="/reports" className="text-blue-500 mt-4 inline-block">Ir para Relatórios</Link>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8">Diaristas Cadastradas</h3>
        <div className="mt-4">
          <ListaDiaristas />
        </div>
      </main>

      <Rodape />
    </div>
  );
};

export default Dashboard;
