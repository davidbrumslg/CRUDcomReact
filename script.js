import { useState } from "react";

export default function App() {
  const [dados, setDados] = useState([]);
  const [nome, setNome] = useState("");
  const [idAtual, setIdAtual] = useState(null); // Armazena o ID se estiver editando

  function salvar() {
    if (!nome) return alert("Digite algo!");

    if (idAtual === null) {
      setDados([...dados, { id: Date.now(), nome }]); // Create: Adiciona um novo objeto à lista
    } else {
      setDados(dados.map(item => item.id === idAtual ? { ...item, nome } : item)); // Update: Mapeia a lista e altera o item com o ID em edição
      setIdAtual(null);
    }
    setNome(""); // Limpa o input
  }

  function prepararEditar(item) {
    setIdAtual(item.id);
    setNome(item.nome);
  }

  function deletar(id) {
    setDados(dados.filter(item => item.id !== id)); // Delete: Filtra a lista removendo o ID selecionado
  }

  return (
    <div>
      <input 
        type="text" 
        value={nome} 
        onChange={(e) => setNome(e.target.value)} 
        placeholder="Nome do item" 
      />
      <button onClick={salvar}>
        {idAtual === null ? "Salvar" : "Atualizar"}
      </button>

      <ul>
        {dados.map((item) => (
          <li key={item.id}>
            {item.nome}
            <button onClick={() => prepararEditar(item)}>Editar</button>
            <button onClick={() => deletar(item.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
