import React from 'react'
import InfoWeather from './InfoWeather'
const data = {
  "coord": {
    "lon": 2.3488,
    "lat": 48.8534
  },
  "weather": [
    {
      "id": 501,
      "main": "Rain",
      "description": "moderate rain",
      "icon": "10n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 288.2,
    "feels_like": 287.93,
    "temp_min": 286.77,
    "temp_max": 288.79,
    "pressure": 999,
    "humidity": 83
  },
  "visibility": 10000,
  "wind": {
    "speed": 3.6,
    "deg": 200
  },
  "dt": 1695324475,
  "sys": {
    "type": 2,
    "id": 2041230,
    "country": "FR",
    "sunrise": 1695274503,
    "sunset": 1695318764
  },
  "timezone": 7200,
  "id": 2988507,
  "name": "Paris",
  "cod": 200
}

describe('<InfoWeather />', () => {

  it("Ne doit pas afficher la page di le props data n'est pas present", () => {
    cy.mount(<InfoWeather />)
    cy.get('.no_data')
  })

  it('doit afficher les donnéde data', () => {
    cy.mount(<InfoWeather data={data} />)
    cy.get('.no_data').should('not.exist');
    cy.get('h1').contains(data.name)
    cy.get('h3').contains("21/09/2023 21:27:55")
    cy.get(':nth-child(1) > :nth-child(1) > p').contains("15.64°C")
    cy.get(':nth-child(1) > :nth-child(2) > p').contains("15.05°C")
    cy.get(':nth-child(1) > :nth-child(3) > p').contains("13.62°C")
    cy.get(':nth-child(3) > :nth-child(1) > p').contains("3.6 km/h - 200°")
    cy.get(':nth-child(3) > :nth-child(2) > p').contains("999 hPa")
    cy.get(':nth-child(3) > :nth-child(3) > p').contains("83%")
    cy.get('.justify-evenly > :nth-child(1) > p').contains("07:35:03")
    cy.get('.justify-evenly > :nth-child(2) > p').contains("19:52:44")
  })

  it('Doit afficher la quantitée de pluie de l\'heure paser', () => {
    cy.mount(<InfoWeather data={{...data, rain: { "1h": 14}}} />)
    cy.get('.justify-center > p').contains("Rain: 14mm")
  })
  it('Doit afficher la quantitée de pluie des 3 heures paser', () => {
    cy.mount(<InfoWeather data={{...data, rain: { "3h": 14, "1h": 24}}} />)
    cy.get('.justify-center > p').contains("Rain: 14mm")
  })
  it('Doit afficher la quantitée de neige de l\'heure paser', () => {
    cy.mount(<InfoWeather data={{...data, snow: { "1h": 14}}} />)
    cy.get('.justify-center > p').contains("Snow: 14mm")
  })
  it('Doit afficher la quantitée de neige des 3 heures paser', () => {
    cy.mount(<InfoWeather data={{...data, snow: { "3h": 14, "1h": 24}}} />)
    cy.get('.justify-center > p').contains("Snow: 14mm")
  })
  it('Doit afficher le pourcentage de nuage dans le ciel', () => {
    cy.mount(<InfoWeather data={{...data, clouds: { all: 14}}} />)
    cy.get('.justify-center > p').contains("Cloud: 14%")
  })
  it('Doit afficher la quantitée de pluie  meme si la variable de nuage est présent dans data', () => {
    cy.mount(<InfoWeather data={{...data, rain: { "1h": 14}, clouds: { all: 14}}} />)
    cy.get('.justify-center > p').contains("Rain: 14mm")
  })

})