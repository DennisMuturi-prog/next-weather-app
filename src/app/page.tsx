import { getWeatherDetails } from "./actions/geocoding";
import SearchBar from "./components/SearchBar";
import SideBar from "./components/SideBar";

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const { lat, lon, location,state } = await searchParams
  const weatherData = await getWeatherDetails({ latitude: lat?Number(lat):20, longitude: lon?Number(lon):20 })
  return (
    <>
    <SideBar weatherData={weatherData} location={location || "unknown"}/>
    </>
  );
}
