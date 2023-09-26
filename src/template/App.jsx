import React, {useState} from "react";
import SearchBar from "../composant/SearchBar.jsx";
import "./App.css"
import InfoWeather from "../composant/InfoWeather";
import FetchAPI from "../utils/getWeather";
import {FaMapMarkerAlt} from "react-icons/fa";
import {getGeoLocation} from "../utils/getGeoLocation";

const App = () => {
    const [weatherData, setWeatherData] = useState(null);

    const onSearch = async (e) => {
        try {
            const data =await FetchAPI.getInfoCity(e);
            if(data)
            setWeatherData(data);
        } catch (e) {
            console.error(e)
            alert("City not find")
        }
    }

    const setWeatherByPos = async () => {
        try {
            const data = await FetchAPI.getInfoGPS(await getGeoLocation())
            if(data)
                setWeatherData(data);
        } catch (e) {
            console.error(e)
            alert("City not find")
        }
    }

    return (
        <main>
            <nav className={"d-flex justify-between align-center"}>
                <div className="flex-1"/>
                <div className="flex-4 d-flex justify-center">
                    <SearchBar
                        onSearch={onSearch}
                    />
                </div>
                <div className="flex-1 d-flex justify-end">

                    <div data-testid="loc_btn" className={"icon_map"} onClick={setWeatherByPos}>

                        <FaMapMarkerAlt/>
                    </div>
                </div>
            </nav>
            <section>
                {weatherData && <InfoWeather data={weatherData}/>}
            </section>
        </main>
    );
};


export default App