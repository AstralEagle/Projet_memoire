import React from 'react'
import SearchBar from './SearchBar'

// describe('<SearchBar />', () => {
//   it('renders', () => {
//     // see: https://on.cypress.io/mounting-react
//     cy.mount(<SearchBar />)
//   })
// })
describe('SearchBar', () => {
  it('Doit afficher "Paris" sur l\'input text', () => {
    cy.mount(<SearchBar />)

    const inputValue = 'Paris';
    cy.get('[data-testid=text_input]').type(inputValue);

    cy.get('[data-testid=text_input]').should('have.value', inputValue);
  });

  it('Doit appeler le props onSearch avec "Paris"', () => {
    const inputValue = 'Paris';
    const onSearch = cy.spy().as("onSearch")

    cy.mount(<SearchBar onSearch={onSearch} />)
    cy.get('[data-testid=text_input]').type(inputValue);
    cy.get('[data-testid=submit_input]').click();
    cy.get('@onSearch').should('have.been.calledWith', inputValue)
  });
});
