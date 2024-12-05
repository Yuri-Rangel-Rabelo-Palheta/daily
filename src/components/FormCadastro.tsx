"use client"

import { useState } from 'react';
import firebase from 'firebase/compat/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/database';
import '../lib/firebaseConfig';


const CadastroForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e : any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Adicionar lógica de cadastro com Firebase aqui

    try {
      // Criar o usuário no Firebase
      console.log('Fazendo o cadastro...');
      console.log(email);
      console.log(password);
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      // Cadastro realizado com sucesso
      console.log('Cadastro realizado com sucesso!');
      // Redirecionar para a página de dashboard ou para onde desejar após o cadastro
    } catch (error) {
      // Caso ocorra um erro durante o cadastro
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <form className="m-10 w-full md:w-1/2 lg:w-1/3" onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input className=' text-black' type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label>Password:</label>
        <input className=' text-black' type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button className={`
                    w-full bg-indigo-500 hover:bg-indigo-400
                    text-white rounded-lg px-4 py-3 mt-6
                `} type="submit">Cadastrar</button>
    </form>
  );
};

export default CadastroForm;
