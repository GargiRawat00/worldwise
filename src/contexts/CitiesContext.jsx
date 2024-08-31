import { createContext, useContext, useEffect, useState } from "react";


const CitiesContext=createContext();
const BASE_URL='http://localhost:8000';
function CitiesProvider({children})
{
    const [currentCity, setCurrentCity]=useState({});
    const [cities, setCities]=useState([]);
  const [isLoading, setIsLoading]=useState(false);
  useEffect(
    function()
    {
      async function fetchCities() {
        try{
          setIsLoading(true);
          const res=await fetch(`${BASE_URL}/cities`);
          const data=await res.json();
          setCities(data);
        }
        catch{
          alert("There was an errorloading data...");
        }
        finally{
          setIsLoading(false);
        }
      }
      fetchCities();
    },[]
  )
  async function getCity(id)
  {
  
        try{
          setIsLoading(true);
          const res=await fetch(`${BASE_URL}/cities/${id}`);
          const data=await res.json();
          setCurrentCity(data);
        }
        catch{
          alert("There was an errorloading data...");
        }
        finally{
          setIsLoading(false);
        }
  }
  return <CitiesContext.Provider value={
    {cities, isLoading, currentCity, getCity}
  }>
    {children}
  </CitiesContext.Provider>
}

function useCities()
{
    const context= useContext(CitiesContext);
    return context;
}
export {CitiesProvider, useCities};