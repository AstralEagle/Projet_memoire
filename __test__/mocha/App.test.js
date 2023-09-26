import React from "react"
import App from "../../src/template/App"
import chai, {expect} from "chai";
import sinonChai from 'sinon-chai';
import sinon from "sinon";

import {api_value} from "../data/api_data";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";

chai.use(sinonChai);

describe('<App/>', () => {

    beforeEach(() => {
        global.fetch = sinon.fake(async () => ({
            status: 200,
            json: async () => (api_value)
        }))
        navigator.geolocation = {
            getCurrentPosition: sinon.fake(async (r) => {
                const position = {coords: {latitude: 48.856613, longitude: 2.352222}};
                r(position)
            })
        }
    });
    afterEach(() => {
        global.fetch = undefined
    })
    it("test 1", async () => {
        render(<App/>);
        fireEvent.change(screen.getByTestId("text_input"), {target: {value: "Paris"}});
        fireEvent.click(screen.getByTestId("submit_input"));

        expect(global.fetch).to.have.been.calledWith("https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=undefined")
        await waitFor(() => {
            expect(screen.getByTestId("title_city").textContent).to.equal("Paris");
        })
    })
    it("test 2", async () => {
        render(<App/>);
        fireEvent.click(screen.getByTestId("loc_btn"));

        expect(navigator.geolocation.getCurrentPosition).to.have.been.called


        await waitFor(() => {
            expect(global.fetch).to.have.been.calledWith("https://api.openweathermap.org/data/2.5/weather?lat=48.856613&lon=2.352222&appid=undefined")
            expect(screen.getByTestId("title_city").textContent).to.equal("Paris");
        })
    })
});