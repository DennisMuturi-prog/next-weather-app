"use server";

import { Coordinates, GeoCoderLocation, UserLocation, WeatherData } from "../types";
import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";

export async function getLocationCoordinates(searchTerm: string): Promise<GeoCoderLocation[]> {
    const apiKey = process.env.API_KEY
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${apiKey}`)
    const data = await res.json()
    console.log(data)
    return data
}

export async function getUserLocationFromCoordinates(locationCoordinates:Coordinates): Promise<UserLocation[]> {
    const apiKey = process.env.API_KEY
    const {latitude,longitude}=locationCoordinates
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}`)
    const data = await res.json()
    console.log(data)
    return data
}
export async function getWeatherDetails(locationCoordinates:Coordinates):Promise<WeatherData>{
    const {latitude,longitude}=locationCoordinates
    const res=await fetch(`http://localhost:8000/api?latitude=${latitude}&longitude=${longitude}&units=standard`)
    const data=res.json()
    return data
}




// export async function getRelevantGeoLocations(searchTerm: string) {
//     return 


// }