import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from "../../src/composant/SearchBar";
import sinon from "sinon";

import { expect } from "chai";

describe('SearchBar', () => {
    it('Dois afficher "Paris" sur l\'input text', () => {
        render(<SearchBar onSearch={sinon.fake()} />);

        const input = screen.getByTestId('text_input');
        const inputValue = 'Paris';

        fireEvent.change(input, { target: { value: inputValue } });
        expect(input.value).to.equal(inputValue)
    });
    it('Dois appeller le props onSearch avec "Paris"', () => {
        const mockOnSearch = sinon.fake();
        render(<SearchBar onSearch={mockOnSearch} />);

        const input = screen.getByTestId('text_input');
        const input_submit = screen.getByTestId('submit_input');
        const inputValue = 'Paris';


        fireEvent.change(input, { target: { value: inputValue } });
        fireEvent.click(input_submit);
        expect(mockOnSearch.calledWith(inputValue)).to.be.ok;
    });
});
