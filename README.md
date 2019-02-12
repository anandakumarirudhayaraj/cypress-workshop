# Hands-on Cypress

## Setup

```bash
git clone https://github.com/dijkstraj/cypress-example-kitchensink.git
cd cypress-example-kitchensink
npm install
npm start

# en in een andere tab:
npm run cy:open
```

Cypress zet een hele lijst voorbeelden neer in `cypress/integration/examples/`,
deze voorbeelden gebruiken we in de rest van de workshop.

## Frontend

Bekijk eerst `querying.spec.js`.
Je ziet hier de standaardopbouw van een Cypress test:

* Standaard Mocha test met `describe()` en `it()`
* Chai assertions in `should()`
* Alle Cypress commando's zitten in `cy`

Elk voorbeeld heeft een bijbehorende pagina in de `app/commands/` waar de tests op uitgevoerd worden.
Deze pagina bevat ook een klein beetje meer informatie over de tests.

Werk door de andere voorbeelden heen om een gevoel te krijgen van wat Cypress kan,
maar laat `network_requests.spec.js` nog even met rust.

Alle tests zijn groen als je het project uitcheckt,
maar je kunt ze natuurlijk kapotmaken door de HTML aan te passen.

Je kun ook zelf een formulier maken om mee te spelen.
Gebruik [Google Forms](https://forms.google.com) om snel iets in elkaar te hacken met verschillende input-componenten
(je kunt [deze](http://bit.ly/cypress-form) pakken als je geen Google account hebt).

## Backend

Met Cypress kun je ook heel makkelijk met de backend praten.

Je kunt zelf requests uitvoeren met `cy.request()`.
Gebruik dit bijvoorbeeld om testdata te seeden of om direct tegen de backend te testen.

Ook kun je requests mocken met `cy.route()`.
Gebruik dit bijvoorbeeld om te testen hoe de frontend met backend errors en failures omgaat.

Volg de voorbeelden in `network_requests.spec.js` om hiermee te spelen.

Waarschuwing: _als je geen response definieert in een `route()`, dan wordt het request **niet** gemockt!_

## Cucumber

Om Gherkin scenario's te kunnen gebruiken in het Cypress framework installeer je de Cucumber preprocessor:

```bash
npm install --save-dev cypress-cucumber-preprocessor
```

Vervolgens laat je Cypress de preprocessor gebruiken door dit in `cypress/plugins/index.js` te zetten:

```javascript
const cucumber = require('cypress-cucumber-preprocessor').default;
module.exports = (on, config) => {
  on('file:preprocessor', cucumber());
};
```

Je kunt nu feature files in `cypress/integration/` en step definitions in `cypress/support/step_definitions/` zetten.

Een voorbeeldje om je op weg te helpen:

```gherkin
# cypress/integration/answer.feature
Feature: find the answer to life, the universe and everything

  Scenario: find it as a math geek
    Given I am a math geek
    When I search for "the answer to life the universe and everything"
    Then I find "42"

  Scenario: find it as a math idiot
    Given I am a math idiot
    When I search for "how much is seven times six"
    Then I find "42"
```

```javascript
// cypress/support/step_definitions/all_the_steps.js
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

when('I search for {string}', query => {
  cy.get('@context').then(context => context.search(query));
});

then('I find {string}', expected => {
  cy.get('@context').then(context => context.find(expected));
});
```

Probeer ook eens [Wolfram|Alpha](https://www.wolframalpha.com) of [Math@StackExchange](https://math.stackexchange.com/) te gebruiken in een test en laat me weten als het lukt 😆

Als verdere oefening kun je een aantal voorbeeldtests porten naar Gherkin.
