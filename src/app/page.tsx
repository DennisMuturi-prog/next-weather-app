import { getWeatherDetails } from "../actions/weatherdetailsfetch";
import WeatherDetails from "../components/WeatherDetails";

export default async function Home({ searchParams }: { searchParams:Promise< { [key: string]: string | undefined } >}) {
    const { lat, lon, location,units,state } = await searchParams
    const weatherData = await getWeatherDetails({ latitude: lat ? Number(lat) : 25.26534, longitude: lon ? Number(lon) : 55.2924914 },units || 'metric')
    const measureUnit = units || "metric"
    const temperatureUnit = measureUnit === "metric" ? "°C" : measureUnit === "imperial" ? "°F" : "K";
    const speedUnit = measureUnit === "metric" ? "km/h" : measureUnit === "imperial" ? "miles/hr" : "m/s";
    const stateParam=state || 'Dubai'


    return (
        <WeatherDetails weatherData={weatherData} location={location || "Dubai"} temperatureUnit={temperatureUnit} speedUnit={speedUnit} state={stateParam}/>
    );
}
