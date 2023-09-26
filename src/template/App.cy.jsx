import React from 'react'
import App from './App'

describe('<App />', () => {


    before(() => {
        cy.stub(navigator.geolocation, 'getCurrentPosition').callsFake((callback) => {
            const position = {
                coords: {
                    latitude: 48.856613,
                    longitude: 2.352222
                }
            };
            callback(position);
        });
    })
    beforeEach(() => {
        cy.intercept(
            'GET', 'https://api.openweathermap.org/data/2.5/weather?lat=48.856613&lon=2.352222&appid=123456789', {fixture: "data_paris"},
        ).as('getLoc')
        cy.intercept(
            'GET', 'https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=123456789', {fixture: "data_paris"},
        ).as('getCity')
    })

    it('renders', () => {
        cy.mount(<App/>)
        cy.get('[data-testid="loc_btn"]').click()
        cy.wait("@getLoc")
        cy.get('[data-testid="title_city"]').contains("Paris")

    })
    it("renders", () => {
        cy.mount(<App/>)
        cy.get('[data-testid="text_input"]').type("Paris")
        cy.get('[data-testid="submit_input"]').click()
        cy.wait("@getCity")
        cy.get('[data-testid="title_city"]').contains("Paris")
    })
})