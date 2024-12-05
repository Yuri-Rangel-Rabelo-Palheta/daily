'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, app } from '@/lib/firebaseConfig'; // Ajuste o caminho para o firebaseConfig
import { getFirestore } from 'firebase/firestore';
//import Layout from '@/components/Layout'; // Certifique-se de ter o layout configurado
import MenuSuperior from '@/components/MenuSuperior';
import Rodape from '@/components/Rodape';

const firestore = getFirestore(app);

const FormularioUsuario = () => {
  const [diarista, setDiarista] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchDiarista = async () => {
      setLoading(true);
      setErro('');
      try {
        const usuarioAtual = auth.currentUser;

        if (!usuarioAtual) {
          setErro('Usuário não autenticado. Faça login novamente.');
          setLoading(false);
          return;
        }

        const diaristasCollection = collection(firestore, 'diaristas');
        const q = query(diaristasCollection, where('criadoPor', '==', usuarioAtual.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const diaristaData = querySnapshot.docs[0].data();
          setDiarista(diaristaData);
        } else {
          setErro('Nenhum formulário encontrado para este usuário.');
        }
      } catch (error) {
        console.error('Erro ao buscar o formulário:', error);
        setErro('Erro ao carregar os dados. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchDiarista();
  }, []);

  // Componentes de estados
  const LoadingComponent = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const ErrorComponent = () => (
    <div className="flex flex-col justify-center items-center h-screen text-center text-gray-800">
      <p className="text-red-500 font-semibold text-lg mb-4">{erro}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Tentar novamente
      </button>
    </div>
  );

  const DiaristaComponent = () => (
    <div className="max-w-xl mx-auto bg-white bg-opacity-90 shadow-md rounded-lg px-8 pt-6 pb-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Dados do Diarista</h2>
      <div className="space-y-4 text-gray-700">
        <p><strong>Nome:</strong> {diarista.nome}</p>
        <p><strong>E-mail:</strong> {diarista.email}</p>
        <p><strong>Telefone:</strong> {diarista.telefone}</p>
        <p><strong>Cidade:</strong> {diarista.cidade}</p>
        <p><strong>Estado:</strong> {diarista.estado}</p>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => window.history.back()}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Voltar
        </button>
      </div>
    </div>
  );

  return (
    <>
    <MenuSuperior />
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/path/to/background.jpg')" }}>
        {loading && <LoadingComponent />}
        {!loading && erro && <ErrorComponent />}
        {!loading && diarista && <DiaristaComponent />}
      </div>
    <Rodape />
    </>
  );
};

export default FormularioUsuario;


/* 'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, app } from '@/lib/firebaseConfig'; // Ajuste o caminho para o firebaseConfig
import { getFirestore } from 'firebase/firestore';

const firestore = getFirestore(app);


const FormularioUsuario = () => {
  const [diarista, setDiarista] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchDiarista = async () => {
      setLoading(true);
      setErro('');
      try {
        const usuarioAtual = auth.currentUser;

        if (!usuarioAtual) {
          setErro('Usuário não autenticado.');
          setLoading(false);
          return;
        }

        // Consulta Firestore onde "criadoPor" == UID do usuário
        const diaristasCollection = collection(firestore, 'diaristas');
        const q = query(diaristasCollection, where('criadoPor', '==', usuarioAtual.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Supõe que o usuário só tem um formulário cadastrado
          const diaristaData = querySnapshot.docs[0].data();
          setDiarista(diaristaData);
        } else {
          setErro('Nenhum formulário encontrado para este usuário.');
        }
      } catch (error) {
        console.error('Erro ao buscar o formulário:', error);
        setErro('Erro ao carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchDiarista();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-500">{erro}</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 my-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Dados do Diarista</h2>
      {diarista && (
        <>
          <p><strong>Nome:</strong> {diarista.nome}</p>
          <p><strong>E-mail:</strong> {diarista.email}</p>
          <p><strong>Telefone:</strong> {diarista.telefone}</p>
          <p><strong>Cidade:</strong> {diarista.cidade}</p>
          <p><strong>Estado:</strong> {diarista.estado}</p>
        </>
      )}
    </div>
  );
};

export default FormularioUsuario;
 */