Cypress.Commands.add('getByTestId', { prevSubject: 'optional' }, (subject, testId) => {
  return subject
    ? cy.wrap(subject).find(`[data-test='${testId}']`)
    : cy.get(`[data-test='${testId}']`);
});

Cypress.Commands.add('visitHomePage', (visitOptions = {}) => {
  return cy.visit('/', visitOptions).wait(100);
});

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      visitHomePage(visitOptions?: Partial<Cypress.VisitOptions>): Chainable<any>;
    }
  }
}

export {} 
