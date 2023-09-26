import React from "react";

import TextInput from "../../src/composant/TextInput";
import {render, screen} from '@testing-library/react'

describe('TextInput', () => {
    test("first Test", () => {
        render(<TextInput label={"teste"} value_hook={["test", ()=> {}]}/>)
    });
});
