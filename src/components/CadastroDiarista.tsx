'use client';

import { useState } from 'react';
import { doc, setDoc, collection } from 'firebase/firestore';
import { auth, app } from '@/lib/firebaseConfig'; // Ajuste o caminho para o firebaseConfig
import { getFirestore } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const firestore = getFirestore(app);

const CadastroDiarista = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const router = useRouter();

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

      const diaristaData = {
        nome,
        email,
        telefone,
        cidade,
        estado,
        criadoPor: usuarioAtual.uid, // Associa ao usuário atual
        dataCadastro: new Date().toISOString(),
      };

      // Salva os dados no Firestore
      const diaristasCollection = collection(firestore, 'diaristas');
      const diaristaDoc = doc(diaristasCollection);
      await setDoc(diaristaDoc, diaristaData);

      setSucesso(true);
      setNome('');
      setEmail('');
      setTelefone('');
      setCidade('');
      setEstado('');

      // Redireciona ou mostra um feedback
      router.push('/dashboard'); // Exemplo de redirecionamento
    } catch (error) {
      console.error('Erro ao cadastrar diarista:', error);
      setErro('Ocorreu um erro ao tentar cadastrar o diarista.');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 my-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Cadastro de Diarista</h2>
      {erro && <p className="text-red-500 text-center">{erro}</p>}
      {sucesso && <p className="text-green-500 text-center">Cadastro realizado com sucesso!</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
            Nome Completo
          </label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
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
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
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
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Ex.: SP"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroDiarista;
