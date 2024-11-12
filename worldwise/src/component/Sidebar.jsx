import AppNav from "./AppNav"
import styles from "./Sidebar.module.css"
import Logo from "./Logo"

import { Outlet } from "react-router-dom"

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>Sidebar
    
    <Logo/>
    <AppNav/>
    <Outlet/>
<footer className={styles.footer}>
    <p className={styles.copyright}>&copy; copyright {new Date().getFullYear()} by WorldWise Inc.</p>
</footer>
    </div>
  )
}
