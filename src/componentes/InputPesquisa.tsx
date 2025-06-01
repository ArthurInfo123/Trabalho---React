import React, { useState } from "react";
import styles from "../styles/suggestions.module.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { Livro } from "../interfaces/Livro";

interface InputPesquisaProps {
  setDados?: React.Dispatch<React.SetStateAction<Livro[]>>;
}

function InputPesquisa({ setDados }: InputPesquisaProps) {
  const [pesquisa, setPesquisa] = useState<string>("");
  const [livros, setLivros] = useState<Livro[]>([]);

  const pesquisarLivrosNaApi = async (value: string) => {
    setPesquisa(value);

    if (!value) {
      setLivros([]);
      return;
    }

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${value}`
    );
    const data = await response.json();

    if (data.items) {
      const livros = data.items.map((item: any) => ({        
        titulo: item.volumeInfo.title,
        autores: item.volumeInfo.authors || ["Autor desconhecido"],
        ano: item.volumeInfo.publishedDate || "Data desconhecida",
      }));
      setLivros(livros);
    } else {
      setLivros([]);
      console.log("Nenhum livro encontrado.");
    }
  };

  async function adicionarLivro(index: number) {
    const livroSelecionado = livros[index];

    await addDoc(collection(db, "livros"), {
      titulo: livroSelecionado.titulo,
      autores: livroSelecionado.autores,
      ano: livroSelecionado.ano,
    });

    if (setDados) {
      setDados((prev) => [...prev, livroSelecionado]);
      alert("Livro adicionado com sucesso!");
      setPesquisa("");
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Adicionar Livros"
        className="border border-gray-300 rounded p-2"
        name="pesquisa"
        onChange={(e) => pesquisarLivrosNaApi(e.target.value)}
      />

      {pesquisa && livros.length > 0 && (
        <div className={styles.suggestions}>
          <table>
            <tbody>
              {livros.map((livro, key) => (
                <tr key={key} className={styles.suggestionItem} onClick={() => adicionarLivro(key)}>
                  <td className={styles.suggestionItem} title="Clique para adicionar">{livro.titulo}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InputPesquisa;
