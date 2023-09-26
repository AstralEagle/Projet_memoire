import React from 'react'
import {render, screen} from "@testing-library/react";
import {expect} from "chai";

import InfoWeather from '../../src/composant/InfoWeather.jsx'
import {api_value} from "../data/api_data";


describe('<InfoWeather />', () => {

    it("Ne doit pas afficher la page di le props data n'est pas present", () => {
        render(<InfoWeather/>)
        expect(screen.getByTestId('no_data')).to.exist
    })
    it('doit afficher les donnéde data', () => {
        render(<InfoWeather data={api_value}/>)
        // expect(screen.getByTestId('.no_data')).should('not.exist')
        expect(screen.getByTestId('title_city').textContent).to.equal("Paris")
        expect(screen.getByTestId('time_city').textContent).to.equal("21/09/2023 21:27:55")
        expect(screen.getByTestId('max_temp').textContent).to.equal("15.64°C")
        expect(screen.getByTestId('current_temp').textContent).to.equal("15.05°C")
        expect(screen.getByTestId('min_temp').textContent).to.equal("13.62°C")
        expect(screen.getByTestId('wind_data').textContent).to.equal("3.6 km/h - 200°")
        expect(screen.getByTestId('pressure_data').textContent).to.equal("999 hPa")
        expect(screen.getByTestId('humidity_data').textContent).to.equal("83%")
        expect(screen.getByTestId('time_sunrise').textContent).to.equal("07:35:03")
        expect(screen.getByTestId('time_sunset').textContent).to.equal("19:52:44")
    })

    it('Doit afficher la quantitée de pluie de l\'heure paser', () => {
        render(<InfoWeather data={{...api_value, rain: {"1h": 14}}}/>)
        expect(screen.getByTestId('rain_data').textContent).to.equal("Rain: 14mm")
    })
    it('Doit afficher la quantitée de pluie des 3 heures paser', () => {
        render(<InfoWeather data={{...api_value, rain: {"3h": 14, "1h": 24}}}/>)
        expect(screen.getByTestId('rain_data').textContent).to.equal("Rain: 14mm")
    })
    it('Doit afficher la quantitée de neige de l\'heure paser', () => {
        render(<InfoWeather data={{...api_value, snow: {"1h": 14}}}/>)
        expect(screen.getByTestId('snow_data').textContent).to.equal("Snow: 14mm")
    })
    it('Doit afficher la quantitée de neige des 3 heures paser', () => {
        render(<InfoWeather data={{...api_value, snow: {"3h": 14, "1h": 24}}}/>)
        expect(screen.getByTestId('snow_data').textContent).to.equal("Snow: 14mm")
    })
    it('Doit afficher le pourcentage de nuage dans le ciel', () => {
        render(<InfoWeather data={{...api_value, clouds: {all: 14}}}/>)
        expect(screen.getByTestId('cloud_data').textContent).to.equal("Cloud: 14%")
    })
    it('Doit afficher la quantitée de pluie  meme si la variable de nuage est présent dans data', () => {
        render(<InfoWeather data={{...api_value, rain: {"1h": 14}, clouds: {all: 14}}}/>)
        expect(screen.getByTestId('rain_data').textContent).to.equal("Rain: 14mm")
    })
})