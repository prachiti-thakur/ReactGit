import { useActionData, useNavigate, useSearchParams } from "react-router-dom"
import styles from "./Map.module.css"
import { MapContainer,TileLayer,Marker,Popup,useMap, useMapEvent } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/citiesContext";


export default function Map() {

 const  navigate= useNavigate();

 const {cities}=useCities();

 const [mapPosition,setMapPositon]=useState([40,0])


// this navigate function we use to navigate to the any url
  const [searchParams,setSearchParams]=useSearchParams();
  const maplat=searchParams.get('lat');
  const maplng=searchParams.get('lng');

  useEffect(
    function(){
      if(maplat && maplng) setMapPositon([maplat,maplng]);
    },[maplat,maplng]
  );


  return (
    <div className={styles.mapContainer} onClick={()=>{
      navigate("form")
    }}>
      <MapContainer 
      // center={[maplat,maplng]} 
      center={mapPosition}
      zoom={6}
      scrollWheelZoom={true}
      className={styles.mapContainer}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {cities.map((city)=>(
      <Marker position={[city.position.lat,city.position.lng]} key={city.id}>
      <Popup>
        <span>{city.emoji}</span>
        <span>{city.cityName}</span>
      </Popup>
    </Marker>
    ))}

<ChangeCenter position={[maplat || 40,maplng|| 0]}/>

  </MapContainer>
    </div>
  )
}

// custume component

function ChangeCenter({position}){
// currenr instance of the map
const map=useMap();
map.setView(position);
return null;
}


//custome componet
function DetectClick(){
  const navigate=useNavigate();
  useMapEvent({
    click:(e)=>{
      console.log(e);
      navigate(`form`);
    }
  })
}