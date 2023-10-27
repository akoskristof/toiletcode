import { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import BasePage from "@/components/BasePage";
import Link from "next/link";

const Map = (props) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchLngLat, setSearchLngLat] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const autocompleteRef = useRef(null);
  const [address, setAddress] = useState("");
  const [places, setPlaces] = useState([
    {title:'Móricz mc donalds',lat:47.5,lng:19.1},
    {title:'Fővám tér burger king',lat:47.56,lng:19.07},
    {title:'Nyugati Gyrosos',lat:47.4,lng:19.15},
    {title:'Keleti Meki',lat:47.5,lng:19.03},

  ]);
  const [selected, setSelected] = useState(null);

  // laod script for google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  useEffect(() => {
    if (selected!=null)
    handlePlaceChanged()
  }, [selected]);
  
  // handle place change on search
  const handlePlaceChanged = () => {
    const place = places[selected];
    setSelectedPlace(place);
    setSearchLngLat({
      lat: place.lat,
      lng: place.lng,
    });
    setCurrentLocation(null);
  };

  // get current location
  const handleGetLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedPlace(null);
          setSearchLngLat(null);
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };


  if (!isLoaded) return <div>Loading....</div>;

  // static lat and lng
  const center = { lat: 41, lng: 21 };

  // on map load
  const onMapLoad = (map) => {
    const controlDiv = document.createElement("div");
    const controlUI = document.createElement("div");
    controlUI.innerHTML = "Get Location";
    controlUI.style.backgroundColor = "white";
    controlUI.style.color = "black";
    controlUI.style.border = "2px solid #ccc";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginBottom = "22px";
    controlUI.style.textAlign = "center";
    controlUI.style.width = "100%";
    controlUI.style.padding = "8px 0";
    controlUI.addEventListener("click", handleGetLocationClick);
    controlDiv.appendChild(controlUI);

    console.log('mapLoad');
    

    // const centerControl = new window.google.maps.ControlPosition(
    //   window.google.maps.ControlPosition.TOP_CENTER,
    //   0,
    //   10
    // );

    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
      controlDiv
    );
  };

  return (
    <BasePage
    back='/'
    style={{flexDirection:'row'}}
    >
      <div className="flex flex-col flex-1 bg-white min-h-screen">
        <Link href='/' className="self-start p-8 pb-0 text-xl z-10">{"< Vissza"}</Link>
        <h1>ToiletCode</h1>
        <Autocomplete
        onLoad={(autocomplete) => {
          console.log("Autocomplete loaded:", autocomplete);
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={handlePlaceChanged}
        className="flex align-center"
        options={{ fields: ["address_components", "geometry", "name"] }}
      >
        <input type="text" placeholder="Search for a location" 
        className="flex-1 mr-8 self-center"/>
        </Autocomplete>
        {selected==null ? places.map((e,i)=>{
          return (<button key={i} className={` m-2 ${selected==i && ' button'}`}
          onClick={()=>setSelected(i)}>
            <p>{e.title}</p>
          </button>)
        }):
        <div>
          <div className="flex">
          
            <span style={{flexGrow:1,fontSize:'24px'}}>{places[selected].title} </span>
            <button className='mr-5 text-xl' onClick={()=>setSelected(null)}>X</button>
          
        </div><p>3.5 km messze tőled</p>
          <h1 className='text-center'>#4325</h1>  
          <p className="pl-3">Kommentek:</p>
          <div className="overflow-hidden height-200">  
            {[1,1,1].map((e,i)=><div
            key={'komment'+i} className="p-2 m-2 bg-slate-200	">
              <p><b>Egy user</b></p>
              <span>Ez egy jó hely!</span>
            </div>)}
          </div>
        </div>}
      </div>

      {/* map component  */}
      <GoogleMap
        zoom={currentLocation || selectedPlace ? 18 : 12}
        center={currentLocation || searchLngLat || center}
        mapContainerClassName="map"
        onLoad={onMapLoad}
      >
        {places.map((e,i)=><Marker position={{lat:e.lat,lng:e.lng}} key={'marker'+i}
        onClick={()=>setSelected(i)}/>)}
        {selectedPlace && <Marker position={searchLngLat} />}
        {currentLocation && <Marker position={currentLocation} />}
      </GoogleMap>
    </BasePage>
  );
};

export default Map;