import {useLocation} from 'react-router-dom'

import Message from "../layout/Message"

import styles from './Projeto.module.css'

import Container from '../layout/Container'

import Linkbutton from '../layout/Linkbutton'

import Loading from '../layout/Loading'

import ProjectCard from '../Project/ProjectCard'

import { useState, useEffect } from 'react'


function Projeto() {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    
    console.log(location)
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('https://costs-api-iaie.onrender.com/projects', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
                    setProjects(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err))
        }, 1000)
    }, [])

    function removeProject(id){
        
        fetch(`https://costs-api-iaie.onrender.com/projects${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(resp => resp.json())
            .then((data) => {
                setProjects(projects.filter((project) => project.id !== id))
                setProjectMessage('Projeto removido com sucesso!')
            })
            .catch((err) => console.log(err))

    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <Linkbutton to="/NovoProjeto" text="Criar Projeto" />
            </div>
            
            
            
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass='start'>
                {projects.length > 0 && 
                    projects.map((project) => (
                        <ProjectCard
                            name={project.name}
                            id={project.id}
                            budget={project.budget}
                            category={project.category}
                            key={project.id}
                            handleRemove={removeProject}
                        />
                    ))
                }
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Projetos não cadastrados!</p>
                )}
            </Container>
        </div>
    )
}
export default Projeto