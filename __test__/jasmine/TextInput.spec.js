import {render} from "@testing-library/react";
import TextInput from "../../src/composant/TextInput";
import React from "react";

describe('TextInput', () => {
    it("first Test", () => {
        render(<TextInput label={"teste"} value_hook={["test", () => {}]}/>)
    });
});