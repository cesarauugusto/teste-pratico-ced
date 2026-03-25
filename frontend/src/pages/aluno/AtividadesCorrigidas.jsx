import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { api } from "../../api/client";

export default function AtividadesCorrigidas() {
  const [respostas, setRespostas] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const res = await api.get("/me/respostas");
        setRespostas(res.data);
      } catch {
        setErro("Erro ao carregar respostas.");
      }
    }

    carregar();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="page-content">
        <h1 className="page-title">Atividades Corrigidas</h1>

        <div className="page-panel">
          {erro && <p className="error-text">{erro}</p>}

          {respostas.length === 0 ? (
            <p>Nenhuma resposta encontrada.</p>
          ) : (
            <div className="list-grid">
              {respostas.map((resposta) => (
                <div key={resposta.id} className="info-card">
                  <h3>{resposta.atividade?.titulo}</h3>
                  <p><strong>Resposta:</strong> {resposta.texto_resposta}</p>
                  <p><strong>Nota:</strong> {resposta.nota ?? "Ainda não corrigida"}</p>
                  <p><strong>Feedback:</strong> {resposta.feedback ?? "Sem feedback"}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}