it('should work', () => {
  cy.viewport(1300, 900);
  cy.visitHomePage();

  cy.getByTestId('isDesktop').should('exist');
  cy.getByTestId('isBigScreen').should('not.exist');
  cy.getByTestId('isTablet').should('not.exist');
  cy.getByTestId('orientation').should('have.text', 'landscape');

  cy.viewport(1900, 1200).wait(100);
  cy.getByTestId('isDesktop').should('exist');
  cy.getByTestId('isBigScreen').should('exist');
  cy.getByTestId('isTablet').should('not.exist');

  cy.viewport('iphone-6', 'portrait').wait(100)
  cy.getByTestId('isDesktop').should('not.exist');
  cy.getByTestId('isBigScreen').should('not.exist');
  cy.getByTestId('isTablet').should('exist');
  cy.getByTestId('orientation').should('have.text', 'portrait');
});
