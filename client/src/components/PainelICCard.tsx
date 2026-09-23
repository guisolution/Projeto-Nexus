import { useState } from "react";

export function PainelICCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-full max-w-5xl h-[500px] cursor-pointer mx-auto"
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Frente do Cartão: Explicação */}
        <div
          className="absolute w-full h-full bg-white border border-gray-200 rounded-xl shadow-lg p-8 flex flex-col justify-center items-center text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h3 className="text-3xl font-bold text-blue-900 mb-4">
            Painel Intercompany (IC)
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl">
            Este painel acompanha o fluxo de cargas intercompany de ponta a ponta. 
            Ele exibe o status em tempo real, rotas, transportadoras, projeção de cargas, 
            e alertas de gargalos na distribuição entre as fábricas e centros de distribuição.
          </p>
          <span className="mt-8 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium animate-pulse">
            Clica no cartão para visualizar o painel
          </span>
        </div>

        {/* Verso do Cartão: Imagem do Painel */}
        <div
          className="absolute w-full h-full rounded-xl shadow-lg overflow-hidden bg-gray-50"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* O NOME DA IMAGEM FOI ATUALIZADO AQUI */}
          <img
            src="/painelic.png"
            alt="Painel Intercompany"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}