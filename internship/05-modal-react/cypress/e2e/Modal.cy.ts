it('should open and close modals', () => {
  cy.visitHomePage();

  cy.getByTestId('showParentModal').click();
  cy.getByTestId('modalBg').should('exist');
  cy.getByTestId('parentModal').should('exist');
  cy.getByTestId('childModal').should('not.exist');

  cy.getByTestId('showChildModal').click();
  cy.getByTestId('modalBg').should('exist');
  cy.getByTestId('parentModal').should('not.exist');
  cy.getByTestId('childModal').should('exist');

  cy.getByTestId('closeModal').click();
  cy.getByTestId('modalBg').should('exist');
  cy.getByTestId('parentModal').should('exist');
  cy.getByTestId('childModal').should('not.exist');

  cy.getByTestId('closeModal').click();
  cy.getByTestId('modalBg').should('not.exist');
  cy.getByTestId('parentModal').should('not.exist');
  cy.getByTestId('childModal').should('not.exist');
});

it('should close modals by click on background and Esc', () => {
  cy.visitHomePage();

  cy.getByTestId('showParentModal').click();
  cy.getByTestId('showChildModal').click();
  cy.getByTestId('modalBg').should('exist');
  cy.getByTestId('parentModal').should('not.exist');
  cy.getByTestId('childModal').should('exist');

  cy.getByTestId('modalBg').click({ force: true });
  cy.getByTestId('modalBg').should('exist');
  cy.getByTestId('parentModal').should('exist');
  cy.getByTestId('childModal').should('not.exist');

  cy.get('body').type('{esc}');
  cy.getByTestId('modalBg').should('not.exist');
  cy.getByTestId('parentModal').should('not.exist');
  cy.getByTestId('childModal').should('not.exist');
});

it('should display modal number', () => {
  cy.visitHomePage();

  cy.getByTestId('showParentModal').click();
  cy.getByTestId('modalNumber').should('not.exist');

  cy.getByTestId('showChildModal').click();
  cy.getByTestId('childModal').should('exist');
  cy.getByTestId('modalNumber').should('exist');
  cy.getByTestId('modalNumber').contains('1');
});
