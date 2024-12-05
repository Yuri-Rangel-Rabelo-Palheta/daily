'use client';

import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { auth, app } from '@/lib/firebaseConfig'; // Ajuste o caminho para o firebaseConfig
import { getFirestore } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import MenuSuperior from '@/components/MenuSuperior';
import Rodape from '@/components/Rodape';

const firestore = getFirestore(app);

const ModificarCadastro = () => {
  const [diarista, setDiarista] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchDiarista = async () => {
      setLoading(true);
      setErro('');
      try {
        const usuarioAtual = auth.currentUser;

        console.log('UID do usuário:', usuarioAtual?.uid);

        if (!usuarioAtual) {
          setErro('Usuário não autenticado.');
          setLoading(false);
          return;
        }

        // Criação da consulta
        const diaristasRef = collection(firestore, 'diaristas');
        const diaristaQuery = query(diaristasRef, where('criadoPor', '==', usuarioAtual.uid));
 
        // Execução da consulta
        const diaristaSnapshot = await getDocs(diaristaQuery);

        if (!diaristaSnapshot.empty) {
          const dados = diaristaSnapshot.docs[0].data(); // Obtém os dados do primeiro documento
          setDiarista(dados);
        } else {
          setErro('Nenhum cadastro encontrado para o termo "criadoPor".');
        }

        //const diaristaDocRef = doc(firestore, 'diaristas', usuarioAtual.uid);
        //const diaristaSnapshot = await getDoc(diaristaDocRef);

        /* if (diaristaSnapshot.exists()) {
          setDiarista(diaristaSnapshot.data());
        } else {
          setErro('Nenhum cadastro encontrado para este usuário.');
        } */
      } catch (error) {
        console.error('Erro ao buscar o cadastro:', error);
        setErro('Erro ao carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchDiarista();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setSucesso(false);

    try {
      const usuarioAtual = auth.currentUser;

      if (!usuarioAtual) {
        setErro('Usuário não autenticado.');
        return;
      }

      const diaristaDocRef = doc(firestore, 'diaristas', usuarioAtual.uid);
      await updateDoc(diaristaDocRef, diarista);

      setSucesso(true);
    } catch (error) {
      console.error('Erro ao atualizar o cadastro:', error);
      setErro('Erro ao salvar as alterações.');
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-500">{erro}</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 my-10">
      <MenuSuperior />
      <h2 className="text-2xl font-bold mb-6 text-center">Modificar Cadastro</h2>
      {sucesso && <p className="text-green-500 text-center">Alterações salvas com sucesso!</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
            Nome Completo
          </label>
          <input
            id="nome"
            type="text"
            value={diarista?.nome || ''}
            onChange={(e) => setDiarista({ ...diarista, nome: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Ex.: Maria da Silva"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={diarista?.email || ''}
            onChange={(e) => setDiarista({ ...diarista, email: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Ex.: maria@email.com"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefone">
            Telefone
          </label>
          <input
            id="telefone"
            type="text"
            value={diarista?.telefone || ''}
            onChange={(e) => setDiarista({ ...diarista, telefone: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Ex.: (11) 91234-5678"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cidade">
            Cidade
          </label>
          <input
            id="cidade"
            type="text"
            value={diarista?.cidade || ''}
            onChange={(e) => setDiarista({ ...diarista, cidade: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Ex.: São Paulo"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
            Estado
          </label>
          <input
            id="estado"
            type="text"
            value={diarista?.estado || ''}
            onChange={(e) => setDiarista({ ...diarista, estado: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Ex.: SP"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Salvar Alterações
        </button>
      </form>

      <Rodape />
    </div>
  );
};

export default ModificarCadastro;



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

export default FormularioUsuario; */
