import React from "react"
import App from "../../src/template/App"
import {api_value} from "../data/api_data";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";

describe('<App/>', () => {

    beforeEach(() => {
        global.fetch = jest.fn(async () => ({
            status: 200,
            json: async () => (api_value)
        }))
        navigator.geolocation = {
            getCurrentPosition: jest.fn(async (r,) => {
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

        expect(global.fetch).toHaveBeenCalledWith("https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=undefined")
        await waitFor(() => {
            expect(screen.getByTestId("title_city").textContent).toBe("Paris");
        })
    })
    it("test 2", async () => {
        render(<App/>);
        fireEvent.click(screen.getByTestId("loc_btn"));

        expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledTimes(1)


        await waitFor(() => {
            expect(screen.getByTestId("title_city").textContent).toBe("Paris");
            expect(global.fetch).toHaveBeenCalledWith("https://api.openweathermap.org/data/2.5/weather?lat=48.856613&lon=2.352222&appid=undefined")

        })
    })
});