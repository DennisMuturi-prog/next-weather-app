import { Coordinates,WeatherData } from "@/types"

const API_KEY =process.env.API_KEY
const BACKEND_URL=process.env.BACKEND_URL
export async function getWeatherDetails(locationCoordinates:Coordinates,units:string):Promise<WeatherData>{
    const {latitude,longitude}=locationCoordinates
    if(BACKEND_URL=='https://api.openweathermap.org/data/3.0/onecall'){
        const res=await fetch(`${BACKEND_URL}?lat=${latitude}&lon=${longitude}&units=${units}&exclude=minutely,hourly,alerts&appid=${API_KEY}`,{
            method:"GET",
            // headers:{
            //     "Content-Type":"application/json"
            // }
        })
        const data=res.json()
        return data
    }
    else{
        const res=await fetch(`${BACKEND_URL}?lat=${latitude}&lon=${longitude}&units=${units}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data=res.json()
        return data


    }
}