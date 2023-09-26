import React from "react";


import TextInput from "../../src/composant/TextInput";
import {render} from '@testing-library/react';

describe('TextInput', () => {
    it("first Test", () => {
        render(<TextInput label={"teste"} value_hook={["test", () => {}]}/>)
    });
});