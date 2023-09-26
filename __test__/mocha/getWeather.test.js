import FetchAPI from "../../src/utils/getWeather";
import {api_value} from "../data/api_data";

import {expect} from 'chai'

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
        fetchMockSuccess();
        const response = await FetchAPI.fetchAPI('someurl');
        expect(response).to.exist
    });
    it('getInfoCity devrait retourner les informations de la ville', async () => {
        fetchMockSuccess();
        const response = await FetchAPI.getInfoCity("Paris");
        expect(response).to.equal(api_value);
    });
    it('getInfoGPS devrait retourner les informations de la ville', async () => {
        fetchMockSuccess();
        const response = await FetchAPI.getInfoGPS({long: 0, lat: 0});
        expect(response).to.equal(api_value);
    });

    it('getWheaterIcon devrait retourner l\'URL de l\'icône météo', () => {
        const iconId = '01d'; // ID d'exemple
        const iconUrl = FetchAPI.getWheaterIcon(iconId);
        expect(iconUrl).to.equal(`https://openweathermap.org/img/wn/${iconId}@2x.png`);
    });

    it('fetchAPI ne devrait pas retourner "undefined"', async () => {
        const response = await FetchAPI.fetchAPI('someurl');
        expect(response).to.equal(undefined);
    });
    it('getInfoCity ne devrait pas retourner les informations de la ville', async () => {
        try {
            await FetchAPI.getInfoCity('Paris');
            expect(true).to.equal(false)
        } catch (error) {
            expect(error).to.be.a("Error");
        }
    });
    it('getInfoGPS ne devrait pas retourner les informations de la ville', async () => {
        try {
            await FetchAPI.getInfoGPS({long: 0, lat: 0});
            expect(true).to.equal(false)
        } catch (error) {
            expect(error).to.be.a("Error");
        }
    });
});
