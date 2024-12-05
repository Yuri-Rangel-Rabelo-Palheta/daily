"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-green-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Conectamos Diaristas e Clientes com Confiança
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Facilite sua vida: encontre ou ofereça serviços domésticos de forma prática e segura.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/register"
              className="bg-white text-green-500 px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 shadow-lg"
            >
              Cadastre-se
            </Link>
            <Link
              href="/login"
              className="bg-transparent border border-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-green-500 shadow-lg"
            >
              Entrar
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-8">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
              <img
                src="/images/find.svg"
                alt="Encontre"
                className="h-20 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Encontre Profissionais
              </h3>
              <p className="text-gray-600">
                Descubra diaristas confiáveis próximas a você em apenas alguns cliques.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
              <img
                src="/images/offer.svg"
                alt="Ofereça"
                className="h-20 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Ofereça Serviços
              </h3>
              <p className="text-gray-600">
                Cadastre-se como diarista e receba novas oportunidades facilmente.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
              <img
                src="/images/connect.svg"
                alt="Conecte-se"
                className="h-20 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Conecte-se com Segurança
              </h3>
              <p className="text-gray-600">
                Negocie e agende serviços diretamente no aplicativo com total tranquilidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-8">Depoimentos de Usuários</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <p className="text-gray-600 italic">
                “Consegui encontrar uma diarista excelente em poucos minutos. Recomendo muito!”
              </p>
              <h3 className="font-semibold mt-4 text-green-600">- Ana Silva</h3>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <p className="text-gray-600 italic">
                “Ser diarista ficou mais fácil com esta plataforma. Muito obrigada!”
              </p>
              <h3 className="font-semibold mt-4 text-green-600">- João Santos</h3>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <p className="text-gray-600 italic">
                “A plataforma facilitou muito minha vida. Tudo funciona perfeitamente!”
              </p>
              <h3 className="font-semibold mt-4 text-green-600">- Maria Oliveira</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para Começar?</h2>
          <p className="text-lg mb-6">
            Cadastre-se agora mesmo e transforme sua rotina com facilidade.
          </p>
          <Link
            href="/register"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 shadow-lg"
          >
            Quero me Cadastrar
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} ConectaDiaristas. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
