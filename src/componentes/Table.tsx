import styles from '../styles/tabela.module.css';
import Linhas from './Linhas';
import { TableProps } from '../interfaces/TableProps';

function Table(data: TableProps)
{   
    return (
        <table className={styles.tabela}>
            <tr>                
                <th>Titulo</th>
                <th>ano</th>
                <th>Autores</th>
               
            </tr>
            
               {data.data.map((livro) => (
                    <Linhas titulo = {livro.titulo} ano = {livro.ano} autores={livro.autores}/>
               ))}
            
        </table>
    )
}

export default Table;