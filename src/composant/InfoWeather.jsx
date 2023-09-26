import React from "react";
import FetchAPI from "../utils/getWeather";
import {FaDroplet, FaGauge, FaTemperatureArrowDown, FaTemperatureArrowUp, FaTemperatureLow } from "react-icons/fa6";

import "./InfoWeather.css"
import {FaWind} from "react-icons/fa";
import {WiSunrise, WiSunset} from "react-icons/wi";

const InfoWeather = ({data}) => {

    if (!data) return <div data-testid="no_data" className="no_data">noData</div>
    return (
        <div className="mainDiv">
            <div className="div_name">
                <h1 data-testid="title_city">{data.name}</h1>
                {
                    data.weather.map((x, i) => (
                        <img src={FetchAPI.getWheaterIcon(x.icon)} alt={x.name} key={i}/>
                    ))
                }
            </div>
            <h3 data-testid="time_city">{new Date(data.dt * 1000).toLocaleString()}</h3>
            <div className={"d-flex justify-between"}>
                <div>
                    <div data-testid="max_temp" className="div_temp">
                        <FaTemperatureArrowUp/>
                        <p>{fahreToCel(data.main.temp_max)}°C</p>
                    </div>
                    <div data-testid="current_temp" className="div_temp">
                        <FaTemperatureLow/>
                        <p>{fahreToCel(data.main.temp)}°C</p>
                    </div>
                    <div data-testid="min_temp" className="div_temp">
                        <FaTemperatureArrowDown/>
                        <p>{fahreToCel(data.main.temp_min)}°C</p>
                    </div>
                </div>
                <div className="vertical_divider"/>
                <div>
                    <div className="div_wind">
                        <FaWind/>
                        <p data-testid="wind_data">{data.wind.speed} km/h - {data.wind.deg}°</p>
                    </div>
                    <div className="div_wind">
                        <FaGauge/>
                        <p data-testid="pressure_data">{data.main.pressure} hPa</p>
                    </div>
                    <div className="div_wind">
                        <FaDroplet/>
                        <p data-testid="humidity_data">{data.main.humidity}%</p>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-center info_sky">
                <RainOrSnow data={data}/>
            </div>
            <div className="horizon_divider"/>
            <div className="d-flex justify-evenly sun-info">
                <div>
                    <WiSunrise/>
                    <p data-testid="time_sunrise">{new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>

                </div>
                <div>
                    <WiSunset/>
                    <p data-testid="time_sunset">{new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>

                </div>
            </div>
        </div>
    );
};

const RainOrSnow = ({data}) => {
    if(data.rain)
        return (<p data-testid="rain_data">Rain: {data.rain["3h"]? data.rain["3h"] : data.rain["1h"]}mm</p>)
    else if (data.snow)
        return (<p data-testid="snow_data">Snow: {data.snow["3h"]? data.snow["3h"] : data.snow["1h"]}mm</p>)
    else if (data.clouds)
        return (<p data-testid="cloud_data">Cloud: {data.clouds.all}%</p>)
}

const fahreToCel = (val) => {
    return parseInt((val-273.15)*100)/100
}


export default InfoWeather