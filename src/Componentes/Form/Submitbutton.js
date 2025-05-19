import styles from './Submitbutton.module.css'

function Submitbutton({text}) {
    return (
        <div>
            <button type='submit' className={styles.btn}>{text}</button>
        </div>
    )
}
export default Submitbutton