given('I am a math idiot', () => {
  cy.visit('https://www.google.com/');
  cy.wrap({
    search(query) {
      cy.get('input[name="q"]')
        .type(query)
        .type('{enter}');
    },
    find(expected) {
      cy.get('#cwos').should('contain.text', expected);
    }
  }).as('context');
});