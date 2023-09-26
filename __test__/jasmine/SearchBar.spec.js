import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from "../../src/composant/SearchBar";

describe('SearchBar', () => {
    it('Dois afficher "Paris" sur l\'input text', () => {
        const onSearch = () => {}
        jasmine.createSpy(onSearch);
        render(<SearchBar onSearch={onSearch} />);

        const input = screen.getByTestId('text_input');
        const inputValue = 'Paris';

        fireEvent.change(input, { target: { value: inputValue } });
        expect(input.value).toBe(inputValue)
    });
    it('Dois appeller le props onSearch avec "Paris"', () => {
        const onSearch = jasmine.createSpy();
        render(<SearchBar onSearch={onSearch} />);

        const input = screen.getByTestId('text_input');
        const input_submit = screen.getByTestId('submit_input');
        const inputValue = 'Paris';


        fireEvent.change(input, { target: { value: inputValue } });
        fireEvent.click(input_submit);
        expect(onSearch).toHaveBeenCalled();
    });
});
