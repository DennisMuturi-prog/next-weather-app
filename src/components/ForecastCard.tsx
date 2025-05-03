import React from 'react'
import { Daily, WeatherData } from '../types'
import { formatDate } from '../actions/utilities'
import Image from 'next/image'

function ForecastCard({ weatherData,units }: { weatherData: Daily,units:string }) {
    return (
        <div className="card w-80">
            <div className="card-body">
                <h2 className="card-header">{formatDate(weatherData.dt)}</h2>
                <Image
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`
                    }
                    width={100}
                    height={100}
                    alt='weather condition'
                />
                <p className='text-content2'>{weatherData.summary}</p>
                <div className="card-footer">
                    <p className='text-content1'>{`${weatherData.temp.min} - ${weatherData.temp.max} ${units}`}</p>
                </div>
            </div>
        </div>
    )
}

export default ForecastCard