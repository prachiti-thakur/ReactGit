import styles from "./AppLayout.module.css"
import Sidebar from "../component/Sidebar";
import Map from "../component/Map";


export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar/>
      <Map/>
    </div>
  );
}
