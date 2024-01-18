import { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import BasePage from "@/components/BasePage";
import Link from "next/link";
import axios from "axios";
import { Prisma, Location } from "@prisma/client";
import Comments from "@/components/Comments";
import Posts from "@/components/Posts";

interface p {
  lat: Number
  lng: Number
}
type place = p | google.maps.LatLng | null

const Map = (props) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [center, setCenter] = useState<place>(null);

  const [currentLocation, setCurrentLocation] = useState(null);
  const [newPlace, setNewPlace] = useState<place>(null);
  const autocompleteRef = useRef(null);
  const [searchString, setSearchString] = useState('');
  const [address, setAddress] = useState("");
  const [places, setPlaces] = useState<Array<Location>>([]);
  const [selected, setSelected] = useState<String|null>(null);
  const currentPlace = places.find(e=>e.id==selected);
  const mapRef = useRef()
  const Budapest = { lat: 47.49697646921568, lng: 19.05388508820331 };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  useEffect(() => {
    axios.get('/api/locations/getall').then(res=>{
      console.log(res);
      setPlaces(res.data)
      
    }).catch(err=>{
      console.log(err);
      
    })
  }, []);
  useEffect(() => {
    if (selected!=null)
    handlePlaceChanged()
  }, [selected]);
  
  const handlePlaceChanged = () => { 
    const place = places.find(e=>e.id==selected);
    console.log(place);
    if (!place) return

    setCenter({
      lat: place.lat,
      lng: place.lng,
    });
    setCurrentLocation(null);
  };

  const searchForPlace = () => {
    const place = autocompleteRef?.current?.getPlace();
    console.log(place);
    setCenter({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    setNewPlace({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    
    
  }

  // get current location
  const handleGetLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedPlace(null);
          setCenter(null);
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

  const send = (e)=> {
    e.preventDefault();
    axios.post('api/locations/create',{
      lat: newPlace?.lat,
      lng: newPlace?.lng,
      searchString
    }).then((res)=>{
      const data :Location = res.data
      setPlaces([...places,data])
      setNewPlace(null)
    })
  }

  if (!isLoaded) return <div>Loading....</div>;


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
    style={{flexDirection:'row',background:'white'}}
    >
      <div className="flex-10 bg-white" style={{height:"90vh",width:'300px'}}>
        <Link href='/' className="self-start p-8 pb-0 text-xl z-10">{"< Vissza"}</Link>
        {selected==null ? <div>{places.map((e)=>{
          return (<button key={e.id} style={{width:'90%'}} className={` m-2 ${selected==e.id && ' button'}`}
          onClick={()=>setSelected(e.id)}>
            <p>{e.name}</p>
          </button>)
        })}
        <div className=" bottom-0">
            <form onSubmit={send}>
                <h2>Új hely feltöltése</h2>
                <label htmlFor="placeName">Hely neve</label><br/>
                <div className="flex flex-row">
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      console.log("Autocomplete loaded:", autocomplete);
                      autocompleteRef.current = autocomplete;
                    }}
                    onPlaceChanged={searchForPlace}
                    className="flex align-center"
                    options={{ fields: ["address_components", "geometry", "name"] }}
                  >
                    <input type="text" placeholder="Search for a location" value={searchString} onChange={(e)=>setSearchString(e.target.value)} name='placeName' id='placeName'
                      className="grow-1"/>
                  </Autocomplete>
                  <button onClick={()=>setSearchString('')}>X</button>
                </div>
                <input type="submit" value="Küldés" />
            </form>
          </div>
        </div>:
        <div className=" bg-slate-000	p-2">
          <div className="flex">
          
            <h2 style={{flexGrow:1,paddingLeft:20,paddingTop:4}}>{currentPlace?.name} </h2>
            <span className='mr-5 text-xl cursor-pointer' onClick={()=>setSelected(null)}>X</span>
          
          </div>
          <Posts id={currentPlace?.id} />
          
        </div>}
      </div>
      <GoogleMap
        zoom={currentLocation || selectedPlace ? 18 : 12}
        center={center || currentLocation || Budapest}
        mapContainerClassName="map"
        onLoad={onMapLoad}
        ref={mapRef}
      >
        {!newPlace && places.map((e,i)=><Marker position={{lat:e.lat,lng:e.lng}} key={'marker'+i}
        onClick={()=>setSelected(e.id)}/>)}
        {selectedPlace && <Marker position={center} />}
        {currentLocation && <Marker position={currentLocation} />}
        {newPlace && <Marker position={newPlace} title='Hozzáadjuk ezt a helyet?'/>}
      </GoogleMap>
    </BasePage>
  );
};

export default Map;