"use server"
import { Coordinates, GeoCoderLocation, UserLocation} from "../types";

const API_KEY =process.env.API_KEY
export async function getLocationCoordinates(searchTerm: string): Promise<GeoCoderLocation[]> {
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${API_KEY}`)
    const data = await res.json()
    return data
}

export async function getUserLocationFromCoordinates(locationCoordinates:Coordinates): Promise<UserLocation[]> {
    const {latitude,longitude}=locationCoordinates
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${API_KEY}`)
    const data = await res.json()
    return data
}
