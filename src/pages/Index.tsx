import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import Table from "../componentes/Table";
import { Livro } from "../interfaces/Livro";
import { Link } from "react-router-dom";
import InputPesquisa from "../componentes/InputPesquisa";


function Index() {
  const [dados, setDados] = useState<Livro[]>([]);

  const buscaLivros = async () => {
    const response = await getDocs(collection(db, "livros"));

    const books: Livro[] = response.docs.map((doc) => {
      const data = doc.data();

      return {
        nome: data.nome,
        titulo: data.titulo,       
        ano: data.ano,
        id: data.id,
        autores: data.autores || [],
      };
    });
   
    setDados(books);
  };

  useEffect(() => {
    buscaLivros();
  }, []);

  return (
    <div>
        <InputPesquisa setDados={setDados}/>
      <h1>Sua Lista de livros</h1>
      <Table data = {dados}/>
      
    </div>
  );
}

export default Index;
