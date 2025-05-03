import { getWeatherDetails } from "../../actions/geocoding";
import ForecastCard from "../../components/ForecastCard";
import SideBar from "../../components/SideBar";
import WeatherDetails from "../../components/WeatherDetails";

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    const { lat, lon, location, state,units } = await searchParams
    const weatherData = await getWeatherDetails({ latitude: lat ? Number(lat) : 20, longitude: lon ? Number(lon) : 20 },units || 'metric')
    const measureUnit = units || "metric"
    const temperatureUnit = measureUnit === "metric" ? "°C" : measureUnit === "imperial" ? "°F" : "K";
    const speedUnit = measureUnit === "metric" ? "km/h" : measureUnit === "imperial" ? "miles/hr" : "m/s";


    return (
        <WeatherDetails weatherData={weatherData} location={location || "unkwown"} temperatureUnit={temperatureUnit} speedUnit={speedUnit}/>    );
}
