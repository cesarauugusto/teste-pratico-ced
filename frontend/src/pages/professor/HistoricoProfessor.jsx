import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { api } from "../../api/client";

export default function HistoricoProfessor() {
  const [atividades, setAtividades] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const res = await api.get("/me/atividades");
        setAtividades(res.data);
      } catch {
        setErro("Erro ao carregar atividades.");
      }
    }

    carregar();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="page-content">
        <h1 className="page-title">Ver Atividades</h1>

        <div className="page-panel">
          {erro && <p className="error-text">{erro}</p>}

          {atividades.length === 0 ? (
            <p>Nenhuma atividade encontrada.</p>
          ) : (
            <div className="list-grid">
              {atividades.map((atividade) => (
                <div key={atividade.id} className="info-card">
                  <h3>{atividade.titulo}</h3>
                  <p>{atividade.descricao}</p>
                  <p><strong>Entrega:</strong> {atividade.data_entrega}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {new Date(atividade.data_entrega) >= new Date()
                      ? "Em aberto"
                      : "Encerrada"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}