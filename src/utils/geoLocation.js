
import React from "react";
import { useState } from "react";

const useGeoLocation = () => {

    const [location, setLocation] = useState({ lat: null, lon: null });
    const [error, setError] = useState(null);
    const [address, setAddress] = useState(null);

    const geoLocation = () => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
              async (position) => {
      const {latitude , longitude} = position.coords;
              setLocation({lat:latitude,lon: longitude});
              setError(null);

           try {
            const  API_KEY= "b7a81bd0787e4712bc324019f519df31";
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`);

            const data = await response.json();
   
            console.log(data);
       if(data && data.results && data.results.length > 0){
        setAddress(data.results[0].formatted);
       }else{
        setError("Unable to fetch address");
       }

           } catch (fetcherror) {
            console.log(fetcherror);
         setError("failed to fetch address")            
           }   
    
            },
            (err) => {
              setError(err.message);
            }
          );
        } else {
          setError("Geolocation is not supported");
        }
      };
    

      return {location,error, address,geoLocation};
};

export default useGeoLocation;
