"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig'; // Configuração Firebase

// Define o tipo para os objetos no array de diaristas
interface Diarista {
  criadoPor: string;
  cidade?: string;
  email?: string;
  estado?: string;
  nome?: string;
  telefone?: string;
  dataCadastro?: string;
}

const DiaristasList = () => {
  const [diaristas, setDiaristas] = useState<Diarista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDiaristas = async () => {
      try {
        const diaristasCollection = collection(db, 'diaristas');
        const diaristasSnapshot = await getDocs(diaristasCollection);
        const diaristasData: Diarista[] = diaristasSnapshot.docs.map((doc) => ({
          criadoPor: doc.data().criadoPor,
          cidade: doc.data().cidade,
          email: doc.data().email,
          estado: doc.data().estado,
          nome: doc.data().nome,
          telefone: doc.data().telefone,
          dataCadastro: doc.data().dataCadastro,
        }));
        setDiaristas(diaristasData);
      } catch (err) {
        console.error('Erro ao carregar diaristas:', err);
        setError('Erro ao carregar a lista de diaristas.');
      } finally {
        setLoading(false);
      }
    };

    fetchDiaristas();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Lista de Diaristas</h1>
      <ul>
        {diaristas.map((diarista) => (
          <li key={diarista.criadoPor}>
            <p className='text-gray-600 '>{diarista.nome} - {diarista.criadoPor}</p>
            <Link href={`/diaristas/${diarista.criadoPor}`}>
              <div className="text-blue-500">Ver Detalhes</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiaristasList;
