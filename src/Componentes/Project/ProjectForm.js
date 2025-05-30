import { useEffect, useState } from 'react'
import styles from './ProjectForm.module.css'
import Select from '../Form/Select'
import Input from '../Form/Input'
import Submitbutton from '../Form/Submitbutton'

function ProjectForm({ handleSubmit, btnText, projecData }) {
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState([])
  const [project, setProject] = useState(() => ({
    id: projecData?.id || '',
    name: projecData?.name || '',
    budget: projecData?.budget || '',
    category: projecData?.category || { id: '', name: '' },
    status: projecData?.status || { id: '', name: '' }
  }))

  useEffect(() => {
    fetch('https://costs-api-iaie.onrender.com/categories', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((resp) => resp.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    fetch('https://costs-api-iaie.onrender.com/status', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((resp) => resp.json())
      .then((data) => setStatus(data))
      .catch((err) => console.log(err))
  }, [])

  const submit = (e) => {
    e.preventDefault()
    console.log('Enviando projeto:', project)
    handleSubmit(project)
  }

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value })
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    })
  }

  function handleStatus(e) {
    setProject({
      ...project,
      status: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    })
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type='text'
        text='Nome do projeto'
        name='name'
        placeholder='Ensira o nome do projeto'
        handleOnChange={handleChange}
        value={project.name}
      />

      <Input
        type='number'
        text='Orçamento do projeto'
        name='budget'
        placeholder='Ensira o orçamento total'
        handleOnChange={handleChange}
        value={project.budget}
      />

    <Select
      name='category_id'
      text='Selecione a categoria'
      options={categories}
      handleOnChange={handleCategory}
      value={project.category?.id || ''}
    />

    <Select
      name="status_id"
      text="Selecione o status"
      options={status}
      handleOnChange={handleStatus}
      value={project.status?.id || ''}
    />

      <Submitbutton text={btnText} />
    </form>
  )
}

export default ProjectForm