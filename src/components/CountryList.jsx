import React from 'react'

import styles from './CountryList.module.css'
import Spinner from './Spinner'
import CityItem from './CityItem'
import Message from './Message'
import CountryItem from './CountryItem'
import { useCities } from '../contexts/CitiesContext'
export default function CountryList() {
    const {cities, isLoading}=useCities();
    if(isLoading) return <Spinner/>
    if(!cities.length)
        return(<Message message="Add your first city by clicking on a city on the map"/>
    );
    const countries=cities.reduce((arr,city)=>{
        if(!arr.map((el)=>el.city).includes(city.country))
            return [...arr, {country:city.country,emoji:city.emoji}];
        else return arr;
    },[]);
  return <ul className={styles.countryList}>{countries.map((country)=><CountryItem country={country} key={Date}/>)}</ul>
}
