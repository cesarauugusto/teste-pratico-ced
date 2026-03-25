import { useEffect, useState } from "react";
import { api } from "../../api/client";

export default function MinhasRespostas() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await api.get("/me/respostas");
      setDados(res.data);
    }
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Minhas Respostas</h2>

      {dados.map((r) => (
        <div key={r.id}>
          <p>{r.texto_resposta}</p>
          <p>Nota: {r.nota ?? "-"}</p>
        </div>
      ))}
    </div>
  );
}