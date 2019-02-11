when('I search for {string}', query => {
  cy.get('@context').then(context => context.search(query));
});

then('I find {string}', expected => {
  cy.get('@context').then(context => context.find(expected));
});