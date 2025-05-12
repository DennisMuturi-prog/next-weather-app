import { WeatherData } from "../types"
import SideBar from "./SideBar"
import ForecastCard from "./ForecastCard"

function WeatherDetails({weatherData,location,temperatureUnit,speedUnit,state}:{weatherData:WeatherData,location:string,temperatureUnit:string,speedUnit:string,state:string}) {
  return <>
  <div className="flex">

      <SideBar weatherData={weatherData} location={location || "unknown"} units={temperatureUnit} state={state} />

      <div>
          <div className="flex flex-wrap gap-2">
              {weatherData.daily.slice(1, 4).map(day => <ForecastCard key={day.dt} weatherData={day} units={temperatureUnit} />)}
          </div>
          <div className="flex gap-2 mt-2">
              <div className="card w-80">
                  <div className="card-body">
                      <h2 className="card-header">Wind status</h2>
                      <p className='text-content2'>{`${weatherData.current.wind_speed} ${speedUnit}`}</p>
                      <div className="card-footer">
                          <p className='text-content1'>{`${weatherData.current.wind_deg} °`}</p>
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

}

export default WeatherDetails