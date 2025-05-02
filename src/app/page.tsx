import { getWeatherDetails } from "./actions/geocoding";
import SearchBar from "./components/SearchBar"

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const { latitude, longitude, location } = await searchParams
  const weatherData = await getWeatherDetails({ latitude: Number(latitude), longitude: Number(longitude) })
  // const latitude=searchParams?.lat || 20
  // const longitude=searchParams?.lon || 20
  // const locationName=searchParams?.name || "no current location"

  return (
    <>
      <div className="navbar">
        <SearchBar />
        <div className="navbar-end">
          <div className="tabs tabs-boxed">
            <input type="radio" name="units" id="unit1" className="tab-toggle" defaultChecked />
            <label htmlFor="unit1" className="tab navbar-item">Celcius</label>
            <input type="radio" name="units" id="unit2" className="tab-toggle" />
            <label htmlFor="unit2" className="tab">Fahrenheit</label>
            <input type="radio" name="units" id="unit3" className="tab-toggle" />
            <label htmlFor="unit3" className="tab">Kelvin</label>
          </div>
        </div>
      </div>
      
      <div>
      </div>
    </>
  );
}
