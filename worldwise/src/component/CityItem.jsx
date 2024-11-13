
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));
  

export default function CityItem({city}) {

console.log(city);
// destructuring the city object 
const {cityName,emoji,date,id,position}=city
console.log(position)//position contain the lattitude and longitude


  return (
<li>
    <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={styles.cityItem}>
   
    <span className={styles.emoji}>{emoji}</span>
    <h3 className={styles.name}>{cityName}</h3>
    <time className={styles.date}>({formatDate(date)})</time>
    <button className={styles.deleteBtn}> &times;</button>
    </Link>
</li>
  )
}
