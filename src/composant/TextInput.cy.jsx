import React from 'react'
import TextInput from './TextInput'

describe('<TextInput />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TextInput label={"test"} value_hook={["", () => {}]} />)
  })
})