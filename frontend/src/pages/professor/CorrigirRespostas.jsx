import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { api } from "../../api/client";

export default function CorrigirRespostas() {
  const [atividades, setAtividades] = useState([]);
  const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
  const [respostas, setRespostas] = useState([]);
  const [erro, setErro] = useState("");
  const [nota, setNota] = useState({});
  const [feedback, setFeedback] = useState({});

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

  async function abrirAtividade(atividade) {
    setAtividadeSelecionada(atividade);
    setErro("");

    try {
      const res = await api.get(`/atividades/${atividade.id}/respostas/`);
      setRespostas(res.data);
    } catch {
      setErro("Erro ao carregar respostas da atividade.");
    }
  }

  async function salvarCorrecao(respostaId) {
    try {
      await api.patch(`/respostas/${respostaId}`, {
        nota: Number(nota[respostaId]),
        feedback: feedback[respostaId] || "",
      });

      alert("Correção salva com sucesso.");

      const res = await api.get(`/atividades/${atividadeSelecionada.id}/respostas/`);
      setRespostas(res.data);
    } catch {
      alert("Erro ao salvar correção.");
    }
  }

  const atividadesComRespostas = atividades.filter((atividade) =>
    respostas.length > 0 ? true : true
  );

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="page-content">
        <h1 className="page-title">Corrigir Respostas</h1>

        <div className="page-panel">
          {!atividadeSelecionada ? (
            <>
              <h2 style={{ marginBottom: 16 }}>Selecione uma atividade</h2>
              <p style={{ color: "var(--muted)", marginBottom: 16 }}>
                Aqui aparecem as atividades criadas. Ao clicar, você verá as respostas dos alunos para corrigir.
              </p>

              {erro && <p className="error-text">{erro}</p>}

              <div className="list-grid">
                {atividadesComRespostas.map((atividade) => (
                  <button
                    key={atividade.id}
                    className="info-card"
                    style={{ textAlign: "left", cursor: "pointer" }}
                    onClick={() => abrirAtividade(atividade)}
                  >
                    <h3>{atividade.titulo}</h3>
                    <p>{atividade.descricao}</p>
                    <p><strong>Entrega:</strong> {atividade.data_entrega}</p>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={{ marginBottom: 18 }}>
                <h2>{atividadeSelecionada.titulo}</h2>
                <p style={{ color: "var(--muted)" }}>
                  {atividadeSelecionada.descricao}
                </p>
              </div>

              <button
                className="secondary-btn"
                style={{ marginBottom: 18 }}
                onClick={() => {
                  setAtividadeSelecionada(null);
                  setRespostas([]);
                  setErro("");
                }}
              >
                Voltar para atividades
              </button>

              {erro && <p className="error-text">{erro}</p>}

              {respostas.length === 0 ? (
                <p>Nenhuma resposta enviada para esta atividade.</p>
              ) : (
                <div className="list-grid">
                  {respostas.map((resposta) => (
                    <div key={resposta.id} className="info-card">
                      <h3>{resposta.aluno?.name || "Aluno"}</h3>
                      <p><strong>Resposta:</strong> {resposta.texto_resposta}</p>
                      <p><strong>Nota atual:</strong> {resposta.nota ?? "Não corrigida"}</p>
                      <p><strong>Feedback atual:</strong> {resposta.feedback ?? "Sem feedback"}</p>

                      <div className="form-block" style={{ marginTop: 14 }}>
                        <input
                          type="number"
                          step="0.1"
                          placeholder="Nota"
                          value={nota[resposta.id] || ""}
                          onChange={(e) =>
                            setNota((prev) => ({
                              ...prev,
                              [resposta.id]: e.target.value,
                            }))
                          }
                        />

                        <textarea
                          rows={4}
                          placeholder="Feedback"
                          value={feedback[resposta.id] || ""}
                          onChange={(e) =>
                            setFeedback((prev) => ({
                              ...prev,
                              [resposta.id]: e.target.value,
                            }))
                          }
                        />

                        <button
                          className="action-btn"
                          onClick={() => salvarCorrecao(resposta.id)}
                        >
                          Salvar Correção
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}