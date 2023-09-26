const key = process.env.REACT_APP_WEATHER_KEY;
const defaultUrl = "https://api.openweathermap.org/"

class FetchAPI {

    static async fetchAPI(url, needKey = false) {
        try {
            return await fetch(
                `${defaultUrl}${url}${needKey && `&appid=${key}`}`,
            );
        } catch (e) {
            return undefined;
        }

    }

    static async getInfoCity(cityName) {
        const res = await this.fetchAPI(`data/2.5/weather?q=${cityName}`, true)
        if (res.status !== 200) {
            throw new Error("Data non trouvé");
        }
        return await res.json()
    }

    static async getInfoGPS({long, lat}) {
        const res = await this.fetchAPI(`data/2.5/weather?lat=${lat}&lon=${long}`, true)
        if (res?.status !== 200) {
            throw new Error("Data non trouvé");
        }
        return await res.json()
    }

    static getWheaterIcon(id) {
        return `https://openweathermap.org/img/wn/${id}@2x.png`;
    }
}

export default FetchAPI;