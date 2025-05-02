import { findBestMatch, formatDate } from "../actions/NaturalLib"
import { WeatherData } from "../types"
import Image from "next/image"

function SideBar({ weatherData,location,units }: { weatherData: WeatherData,location:string,units:string }) {
    return (
        <aside className="sidebar justify-start">
            <section className="sidebar-content pl-4">
                <Image
                    src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@4x.png`}
                    width={200}
                    height={200}
                    alt="weather condition" />
                <p>{`${weatherData.current.temp} ${units}`}</p>
                <p className="mt-10">{formatDate(weatherData.current.dt)}</p>
                <p>{location}</p>

            </section>
            <section className="sidebar-footer justify-end">
            </section>
        </aside>

    )
}

export default SideBar