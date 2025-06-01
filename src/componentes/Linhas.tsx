import { Livro } from "../interfaces/Livro";

function Linhas(props: Livro){ 
    return (
        <>
            <tr>                   
                
                <td>{props.titulo}</td>
                <td>{props.ano}</td>
                <td>{props?.autores?.join(",")}</td>                
            </tr>            
        </>       
    )
}

export default Linhas;