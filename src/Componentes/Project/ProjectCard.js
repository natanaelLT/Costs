import styles from './ProjectCard.module.css'
import { Link } from 'react-router-dom'
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function ProjectCard({ id, name, budget, category, handleRemove }) {
    
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    
    return (
        <div className={styles.project_card} >
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R${budget} 
            </p>
            <p className={styles.category_text}>
            <span className={`${styles[category?.name?.toLowerCase() || '']}`}></span> {category?.name}
            </p>
            <div className={styles.project_card_actions}>

                <Link to={`/Project/${id}`}>
                <BsPencil/> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill/> Remover
                </button>
            </div>
        </div>
    )
}

export default ProjectCard