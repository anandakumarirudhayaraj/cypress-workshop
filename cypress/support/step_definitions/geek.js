given('I am a math geek', () => {
  cy.visit('https://duckduckgo.com/');
  cy.wrap({
    search(query) {
      cy.get('#search_form_input_homepage').type(query, {force: true});
      cy.get('#search_button_homepage').click({force: true});
    },
    find(expected) {
      cy.get('.result__title').should(results => {
        expect(results.text()).to.contain(expected);
      });
    }
  }).as('context');
});
