import styles from './Home.module.css';
import savings from '../../Img/savings.svg'
import Linkbutton from '../layout/Linkbutton';

function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar seus projetos agora mesmo!</p>
            <Linkbutton to="/NovoProjeto" text="Criar Projeto" />
            <img src={savings} alt="Costs" />
        </section>
    )
}
export default Home