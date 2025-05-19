import { TiSocialFacebookCircular } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";
import styles from "./Footer.module.css"

function Footer() {
    return (
    <footer className={styles.foot}>
            <ul className={styles.social_list}>
            <li><TiSocialFacebookCircular/></li>
            <li><SlSocialInstagram/></li>
            <li><SlSocialLinkedin/></li>
            </ul>
            <p className={styles.copy_right}><span>Costs</span> &copy; 2025</p>
    </footer>
       
    )
}
export default Footer