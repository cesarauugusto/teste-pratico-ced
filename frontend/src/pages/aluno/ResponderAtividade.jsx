import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { api } from "../../api/client";

export default function ResponderAtividade() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const atividade = state?.atividade;
  const [texto, setTexto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  async function enviarResposta(e) {
    e.preventDefault();
    setMensagem("");
    setErro("");

    try {
      await api.post("/respostas", {
        atividade_id: Number(id),
        texto_resposta: texto,
      });

      setMensagem("Resposta enviada com sucesso.");
      setTexto("");
    } catch (err) {
      const detalhe =
        err.response?.data?.detail ||
        err.response?.data?.non_field_errors?.[0] ||
        "Erro ao enviar resposta.";
      setErro(detalhe);
    }
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="page-content">
        <h1 className="page-title">Responder Atividade</h1>

        <div className="page-panel">
          <h2 style={{ marginBottom: 12 }}>
            {atividade?.titulo || `Atividade ${id}`}
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 18 }}>
            {atividade?.descricao || "Descreva sua resposta abaixo."}
          </p>

          <form onSubmit={enviarResposta} className="form-block">
            <textarea
              rows={8}
              placeholder="Digite sua resposta"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />

            <div className="form-actions">
              <button type="submit" className="action-btn">
                Enviar Resposta
              </button>
              <button
                type="button"
                className="secondary-btn"
                onClick={() => navigate("/aluno/atividades")}
              >
                Voltar
              </button>
            </div>
          </form>

          {mensagem && <p className="success-text">{mensagem}</p>}
          {erro && <p className="error-text">{erro}</p>}
        </div>
      </main>
    </div>
  );
}