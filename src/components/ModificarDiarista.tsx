'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

const ModificarDiarista = ({ diaristaId }: { diaristaId: string }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    experiencia: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDiarista = async () => {
      try {
        const diaristaRef = doc(db, 'diaristas', diaristaId);
        const diaristaSnap = await getDoc(diaristaRef);

        if (diaristaSnap.exists()) {
          setFormData(diaristaSnap.data() as typeof formData);
        } else {
          setError('Diarista não encontrado.');
        }
      } catch (err) {
        setError('Erro ao carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchDiarista();
  }, [diaristaId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const diaristaRef = doc(db, 'diaristas', diaristaId);
      await updateDoc(diaristaRef, formData);
      alert('Cadastro atualizado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar o cadastro.');
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Modificar Cadastro</h2>
      <div className="mb-4">
        <label htmlFor="nome" className="block text-gray-700">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-lg p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-lg p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="telefone" className="block text-gray-700">Telefone:</label>
        <input
          type="text"
          id="telefone"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-lg p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endereco" className="block text-gray-700">Endereço:</label>
        <textarea
          id="endereco"
          name="endereco"
          value={formData.endereco}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-lg p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="experiencia" className="block text-gray-700">Experiência:</label>
        <textarea
          id="experiencia"
          name="experiencia"
          value={formData.experiencia}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-lg p-2"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Salvar Alterações
      </button>
    </form>
  );
};

export default ModificarDiarista;
