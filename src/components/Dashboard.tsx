'use client'

import Link from 'next/link';
import MenuSuperior from './MenuSuperior';
import Rodape from './Rodape';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Menu Superior */}
      <MenuSuperior />
      
      {/* Conteúdo Principal */}
      <main className="flex-grow bg-gray-100 p-6">
        <h2 className="text-3xl font-semibold text-gray-800">Bem-vindo ao seu Dashboard!</h2>
        <p className="text-gray-700 mt-4">
          Aqui você pode acessar suas informações, gerenciar seu perfil e configurações.
        </p>

        {/* Seção de Links para o usuário */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-600">Seu Perfil</h3>
            <p className="mt-2 text-gray-700">Gerencie suas informações pessoais.</p>
            <Link href="/profile" className="text-blue-500 mt-4 inline-block">Ir para o Perfil</Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-600">Configurações</h3>
            <p className="mt-2 text-gray-700">Altere suas preferências e configurações do sistema.</p>
            <Link href="/settings" className="text-blue-500 mt-4 inline-block">Ir para Configurações</Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-600">Relatórios</h3>
            <p className="mt-2 text-gray-700">Acesse e gere relatórios importantes.</p>
            <Link href="/reports" className="text-blue-500 mt-4 inline-block">Ir para Relatórios</Link>
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <Rodape />
    </div>
  );
};

export default Dashboard;
