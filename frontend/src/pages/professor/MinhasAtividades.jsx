import { useEffect, useState } from "react";
import { api } from "../../api/cliente";

export default function Atividades() {
  const [atividades, setAtividades] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarAtividades() {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/me/atividades", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAtividades(response.data);
      } catch (err) {
        console.error(err);
        setErro("Erro ao carregar atividades");
      }
    }

    carregarAtividades();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Minhas Atividades</h2>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {atividades.length === 0 ? (
        <p>Nenhuma atividade encontrada.</p>
      ) : (
        <ul>
          {atividades.map((atividade) => (
            <li key={atividade.id} style={{ marginBottom: "12px" }}>
              <strong>{atividade.titulo}</strong>
              <br />
              {atividade.descricao}
              <br />
              <small>Entrega: {atividade.data_entrega}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}