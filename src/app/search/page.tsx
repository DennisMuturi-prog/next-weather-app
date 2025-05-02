import { getWeatherDetails } from "../actions/geocoding";
import ForecastCard from "../components/ForecastCard";
import SearchBar from "../components/SearchBar"
import SideBar from "../components/SideBar";

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    const { lat, lon, location, state } = await searchParams
    const weatherData = await getWeatherDetails({ latitude: lat ? Number(lat) : 20, longitude: lon ? Number(lon) : 20 })

    return (
        <>
            <div className="flex">

                <SideBar weatherData={weatherData} location={location || "unknown"} />

                <div className="flex flex-wrap">
                    {weatherData.daily.slice(1, 4).map(day => <ForecastCard key={day.dt} weatherData={day} />)}

                </div>
                <div>
                    <div>
                        <div className="card w-80">
                            <div className="card-body">
                                <h2 className="card-header">Wind status</h2>

                                <p className='text-content2'>{`${weatherData.current.wind_speed} km/h`}</p>
                                <div className="card-footer">
                                    <p className='text-content1'>{`${weatherData.current.wind_deg}`}</p>
                                </div>
                            </div>
                        </div>
                        <div className="card w-80">
                            <div className="card-body">
                                <h2 className="card-header">Humidity</h2>

                                <p className='text-content2'>{`${weatherData.current.humidity} %`}</p>
                                <div className="card-footer">
                                    <progress className="progress" value={weatherData.current.humidity} max="100"></progress>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </>
    );
}
