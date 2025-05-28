import {useNavigate} from 'react-router-dom'

import styles from './NovoProjeto.module.css'

import ProjectForm from '../Project/ProjectForm'

function NovoProjeto() {

    const navigate = useNavigate()

    function createPost(project) {
        project.cost = 0
        project.services = []
    
        const projectToSend = {
            ...project,
            category_id: project.category?.id
        }
    
        fetch('https://costs-api-iaie.onrender.com/projects', {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(projectToSend)
        })
        .then((resp) => resp.json())
            .then((data) => {
                navigate("/Projeto", {state: { message: "Projeto criado com sucesso!" }});
        })
        .catch((err)=> console.log(err))
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Novo Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar projeto"/>
        </div>
    )
}
export default NovoProjeto