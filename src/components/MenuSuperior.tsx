'use client'

import Link from 'next/link';
import BotaoSair from './BotaoSair';

//const MenuSuperior = () => {
const MenuSuperior = () => {
    //const router = useRouter();
  
    //const handleLogout = async () => {
    //  try {
    //    await signOut(auth); // Realiza o logoff no Firebase
    //    router.push('/login'); // Redireciona para a página de login
    //  } catch (error) {
    //    console.error('Erro ao fazer logoff:', error);
    //  }
    //};

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-blue-300">Início</Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-blue-300">Perfil</Link>
            </li>
            <li>
              <Link href="/settings" className="hover:text-blue-300">Configurações</Link>
            </li>
            <li>
              <BotaoSair />
              {/*
            <Link href="/login" className="hover:text-blue-300">Sair</Link>
                
              <button
                onClick={handleLogout}
                className="hover:text-blue-300 focus:outline-none" 
              >*/}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default MenuSuperior;
