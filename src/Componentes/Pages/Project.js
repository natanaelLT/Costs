import {v4 as uuidv4} from 'uuid'

import styles from './Project.module.css'

import progress from './Progressbar.module.css'

import { useParams } from 'react-router-dom'

import { useEffect, useState } from 'react'

import Loading from '../layout/Loading'

import Container from '../layout/Container'

import Message from '../layout/Message'

import ProjectForm from '../Project/ProjectForm'

import ServiceForm from '../service/ServiceForm'

import ServiceCard from '../service/ServiceCard'



function Project() {
    
    const { id } = useParams()

    const [project, setProject] = useState([])
    const [services, setServices ] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    
    useEffect(() => {
        setTimeout(() => {
            fetch(`https://costs-api-iaie.onrender.com/projects/${id}`, {
                method: 'GET',
                headers:{
                    'Content-type': 'application/json', 
                }
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data)
                    setServices(data.services)
                })
                .catch((err) => console.log(err))
        }, 1000)
        
    }, [id])

    function editPost(project) {
        setMessage('')
        
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false

        }

        fetch(`https://costs-api-iaie.onrender.com/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp .json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(false)
                setMessage('Projeto atualizado!')
                setType('success')
            })
            .catch((err) => console.log(err))
    }

    function createService(project) {
        setMessage('')
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
            setType('error')
            project.services.pop()
            return false

        }

        project.cost = newCost

  fetch(`https://costs-api-iaie.onrender.com/projects/${project.id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(project),
  })
    .then((resp) => resp.json())
    .then((data) => {
      setProject(data)
      setShowServiceForm(false)
      setMessage('Serviço adicionado com sucesso!')
      setType('success')
    })
    .catch((err) => console.log(err))

        
    }

    function removeService(id, cost) {
        const servicesUpdate = project.services.filter(
            (services) => services.id !== id
        )

        const projectUpdated = project

        projectUpdated.services = servicesUpdate
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`https://costs-api-iaie.onrender.com/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(projectUpdated) 
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(projectUpdated)
                setServices(servicesUpdate)
                setMessage('Serviço removido com sucesso!')
            })
            .catch(err => console.log(err))

    }
    
    let totalGasto = 0;
    if (project.services && Array.isArray(project.services)) {
    totalGasto = project.services.reduce((sum, s) => sum + Number(s.cost), 0);
    }
    const progresso = Math.min((totalGasto / project.budget) * 100);

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }
    function handleChange(e) {
    
  }


    return (
        <>
            {project.name ? (
                <div  className={styles.project_details}>
                    <Container  customClass='Column'>
                        {message && <Message type={type} msg={message} /> }
                        <div className={styles.details_container} >
                            <div className={styles.title_container}>
                                <h1>Projeto: {project.name}</h1>
                                <button  className={styles.btn} onClick={toggleProjectForm} >
                                    {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                                </button>
                            </div>
                            
                            <div className={progress.progress_bar}>
                            <div className={progress.fill} style={{ width: `${progresso}%` }} />
                            </div>
                            <p>{Math.floor(progresso)}% do orçamento usado</p>
                            {!showProjectForm ? (
                                <div className={styles.project_info} >
                                   <p>
                                        <span>Categoria: </span> {project.category?.name || 'Sem categoria'}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado</span> R${project.cost}
                                    </p>
                                    <p>
                                        <span>Status do projeto:</span> {project.status?.name || 'Sem status'}
                                    </p>
                                </div>                                      

                            ) : (
                                    <div className={styles.project_info}><ProjectForm handleSubmit={editPost} btnText="Concluir edição" projecData={project}/></div>
                            ) }
                        </div>
                        <div>
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button  className={styles.btn} onClick={toggleServiceForm} >
                                    {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            

                            <div className={styles.project_info}>
                            {showServiceForm && (
                                    <ServiceForm
                                    
                                    handleSubmit={createService}
                                    btnText='Adicionar Serviço'
                                    projectData={project}/>
                            )}
                        </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass='start' >
                            {services.length > 0 &&
                                services.map((service) => {
                                    return (
                                        <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    
                                    />
                                    )
                                })
                            }
                            {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading/>
        )}
        </>
    )
}
export default Project