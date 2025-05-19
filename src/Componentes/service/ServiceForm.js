import styles from '../Project/ProjectForm.module.css'

import {v4 as uuidv4} from 'uuid'

import { useState } from 'react'

import Input from '../Form/Input'

import Submitbutton from '../Form/Submitbutton'

function ServiceForm({handleSubmit, btnText, projectData}) {
    
    const [service, setService] = useState({})
    
    function submit(e) {
        e.preventDefault()
        if (!projectData.services) {
            projectData.services = []
        }
        service.id = uuidv4()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e) {
        setService({...service, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type='text'
                text='Nome do serviço'
                name='name'
                placeholder='Insira o nome do serviço'
                handleOnChange={handleChange}
            
            />
            <Input
                type='number'
                text='Custo do serviço'
                name='cost'
                placeholder='Insira o valor total'
                handleOnChange={handleChange}
            
            />
            <Input
                type='text'
                text='Descrição do serviço'
                name='description'
                placeholder='Descreva o serviço'
                handleOnChange={handleChange}
            
            />
            <Submitbutton text={btnText} />
        </form>
    )
}
export default ServiceForm