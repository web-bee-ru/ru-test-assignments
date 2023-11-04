it('should work', () => {
  cy.viewport(1300, 900);
  cy.visitHomePage();

  cy.getByTestId('isDesktop').should('exist');
  cy.getByTestId('isBigScreen').should('not.exist');
  cy.getByTestId('isNotMobile').should('exist');

  cy.viewport(1900, 1200).wait(100);
  cy.getByTestId('isDesktop').should('exist');
  cy.getByTestId('isBigScreen').should('exist');
});
