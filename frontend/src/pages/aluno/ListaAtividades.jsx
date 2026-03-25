import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { api } from "../../api/client";

export default function ListaAtividades() {
  const [atividades, setAtividades] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

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
        <h1 className="page-title">Atividades</h1>

        <div className="page-panel">
          {erro && <p className="error-text">{erro}</p>}

          {atividades.length === 0 ? (
            <p>Nenhuma atividade encontrada.</p>
          ) : (
            <div className="list-grid">
              {atividades.map((atividade) => (
                <button
                  key={atividade.id}
                  className="info-card"
                  style={{ textAlign: "left", cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/aluno/responder/${atividade.id}`, {
                      state: { atividade },
                    })
                  }
                >
                  <h3>{atividade.titulo}</h3>
                  <p>{atividade.descricao}</p>
                  <p><strong>Entrega:</strong> {atividade.data_entrega}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}