"use client";

import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebaseConfig"; // Certifique-se de que este caminho esteja correto

export default function GoogleLoginButton() {
  async function handleGoogleLogin() {
    try {
      const provider = new GoogleAuthProvider(); // Inicializa o provedor do Google
      const response = await signInWithPopup(auth, provider);
      console.log("Usuário logado:", response.user.email);
      console.log("Login efetuado com sucesso");

      // Obtendo o ID Token para autenticação no backend, se necessário
      const token = await response.user.getIdToken();
      console.log("ID Token:", token);

      // Aqui você pode redirecionar o usuário ou realizar outras ações
    } catch (error) {
      console.error("Erro ao fazer login com o Google:", error);
    }
  }

  return (
    <button
      onClick={handleGoogleLogin}
      className={`
        w-full bg-red-500 hover:bg-red-400
        text-white rounded-lg px-4 py-3
      `}
    >
      Entrar com o Google
    </button>
  );
}
