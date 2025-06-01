import { use, useEffect, useState } from 'react';
import styles from '../styles/tabela.module.css';
import { Login } from '../interfaces/Login';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Auth()
{
    const navigate = useNavigate();
    const [users, setUsers] = useState<Login[]>([]);
    const [dados, setDados] = useState<Login>({email: "", senha: ""})
    const handleLogin = (e: any) => {
        const {name, value} = e
        
        setDados((prev) => ({
            ...prev,
            [name]: value
        }));    
    }

    useEffect(() => {
        const buscaUsuariosBanco = async () => {
            const response = await getDocs(collection(db, "usuarios"));
            
            const Login: Login[] = response.docs.map((doc) => {
                  const data = doc.data();
            
                  return {
                    email : data.email,
                    senha : data.senha
                  };
                });

            setUsers(Login);
        }

        buscaUsuariosBanco();       
    
    }, [])      

    const saveLogin = async () => {    
        users.find((user) => user.email === dados.email && user.senha === dados.senha) 
        if (users.some(user => user.email === dados.email && user.senha === dados.senha)) {
            alert("Usuário já cadastrado!, vou redirecionar você para a página inicial.");
            setDados({email: "", senha: ""});
            navigate("/index");
            return;
        }
        if (dados.email === "" || dados.senha === "") {
            alert("Preencha todos os campos!");
            return;
        }
        const response = await addDoc(collection(db, "usuarios"), {
            email: dados.email,
            senha: dados.senha,
        })

        if (response) {
            alert("Usuário cadastrado com sucesso!");
            setDados({email: "", senha: ""});
            navigate("/index");
        } else {
            alert("Erro ao cadastrar usuário.");
        }
    }

    return (
        <div className={styles.formUsers}>
            <h1>Login</h1>
            <div>
                <span>Digite o E-mail</span>
                <input type="email" placeholder="Digite o e-mail" name={"email"} onChange={(e) => handleLogin(e.target)}/>
            </div>
            <div>
                <span>Digite o Senha</span>
                <input type="password" placeholder="Digite o senha" name={"senha"} onChange={(e) => handleLogin(e.target)}/>
            </div>
            <div>
                <button onClick={saveLogin}>Entrar</button>
            </div>
             
        </div>
    )
}


export default Auth;