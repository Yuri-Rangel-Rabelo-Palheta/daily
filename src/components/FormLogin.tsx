"use client"

import { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import '../lib/firebaseConfig';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  //teste com variaveis
  const apiKey =process.env.NEXT_PUBLIC_API_KEY;

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Adicionar lógica de autenticação com Firebase aqui
    try {
      // Fazer o login com o Firebase
      console.log('Fazendo o login...');
      console.log(email);
      console.log(password);
      console.log(apiKey);
      //console.log(process.env.NEXT_PUBLIC_AUTH_DOMAIN);
      //console.log(process.env.NEXT_PUBLIC_PROJECT_ID);
      //console.log(process.env.NEXT_PUBLIC_STORAGE_BUCKET);
      //console.log(process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID);
      //console.log(process.env.NEXT_PUBLIC_APP_ID);
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // Login bem sucedido
      console.log('Login realizado com sucesso!');
      // Redirecionar para a página de dashboard ou para onde desejar após o login
    } catch (error) {
      // Caso ocorra um erro durante o login
      console.error('Erro ao fazer login:', error);
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
                `} type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
