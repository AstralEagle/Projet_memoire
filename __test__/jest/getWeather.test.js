import FetchAPI from "../../src/utils/getWeather"
import {api_value} from "../data/api_data";

describe('FetchAPI', () => {

    afterEach(() => {
        global.fetch = undefined;
    });

    const fetchMockSuccess = () => {
        global.fetch = async () => ({
            status: 200,
            json: async () => (api_value)
        });
    }


    it('fetchAPI devrait retourner une réponse', async () => {
        fetchMockSuccess()
        const response = await FetchAPI.fetchAPI('someurl');
        expect(response).toBeDefined();
    });
    it('getInfoCity devrait retourner les informations de la ville', async () => {
        fetchMockSuccess()
        const response = await FetchAPI.getInfoCity("Paris")
        expect(response).toBeDefined();
    });
    it('getInfoGPS devrait retourner les informations de la ville', async () => {
        fetchMockSuccess()
        const response = await FetchAPI.getInfoGPS({long: 0, lat: 0})
        expect(response).toBeDefined();
    });

    it('getWheaterIcon devrait retourner l\'URL de l\'icône météo', () => {
        const iconId = '01d'; // ID d'exemple
        const iconUrl = FetchAPI.getWheaterIcon(iconId);
        expect(iconUrl).toBe(`https://openweathermap.org/img/wn/${iconId}@2x.png`);
    });

    it('fetchAPI ne devrait pas retourner une réponse', async () => {
        const response = await FetchAPI.fetchAPI('someurl');
        expect(response).toBe(undefined);
    });
    it('getInfoCity ne devrait pas retourner les informations de la ville', async () => {
        await expect(FetchAPI.getInfoCity("Paris"))
            .rejects
            .toThrow()
    });
    it('getInfoGPS ne devrait pas retourner les informations de la ville', async () => {
        await expect(FetchAPI.getInfoGPS({long: 0, lat: 0}))
            .rejects
            .toThrow()
    });
});