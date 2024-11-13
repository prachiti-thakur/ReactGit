import CityItem from "./CityItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

export default function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  // derived countries array from the cities array
  const countries = cities.reduce((array, city) => {
    if (!array.map((e1) => e1.country).includes(city.country))
      return [...array, { country: city.country, emoji: city.emoji }];
    else return array;
  }, []);

  console.log(countries);

  return (
    <>
      <ul className={styles.countryList}>
        {countries.map((country) => (
          <CountryItem country={country} key={country.id} />
        ))}
      </ul>
      <h1>hi</h1>
    </>
  );
}
