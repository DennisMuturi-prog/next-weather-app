import { Coordinates,WeatherData } from "@/types"
export async function getWeatherDetails(locationCoordinates:Coordinates,units:string):Promise<WeatherData>{
    const apiKey = process.env.API_KEY
    const {latitude,longitude}=locationCoordinates
    const res=await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=${units}exclude={minutely,hourly,alerts}&appid=${apiKey}`,{
        method:"GET",
        // headers:{
        //     "Content-Type":"application/json"
        // }
    })
    const data=res.json()
    return data
}