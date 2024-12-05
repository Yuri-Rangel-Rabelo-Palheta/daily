'use client';

import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebaseConfig'; // Certifique-se de ajustar o caminho conforme necessário

const BotaoSair = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Realiza o logoff no Firebase
      router.push('/'); // Redireciona para a página inicial
    } catch (error) {
      console.error('Erro ao fazer logoff:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="hover:text-blue-300 focus:outline-none text-white font-medium"
    >
      Sair
    </button>
  );
};

export default BotaoSair;
