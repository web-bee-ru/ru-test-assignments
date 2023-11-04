it('leaveCount & isTabActive should work', () => {
  cy.visitHomePage();
  cy.getByTestId('leaveCount').should('have.text', '0');

  cy.document().then(doc => cy.stub(doc, 'visibilityState').value('hidden'));
  cy.document().trigger('visibilitychange');
  cy.getByTestId('leaveCount').should('have.text', '1');
  cy.getByTestId('isTabActive').should('have.text', 'нет');

  cy.document().then(doc => cy.stub(doc, 'visibilityState').value('visible'));
  cy.document().trigger('visibilitychange');
  cy.getByTestId('leaveCount').should('have.text', '1');
  cy.getByTestId('isTabActive').should('have.text', 'да');
});

it('onVisibilityChange should work', () => {
  cy.visitHomePage({
    onBeforeLoad: win => {
      cy.spy(win.console, 'log').as('console.log');
    },
  });
  cy.get('@console.log').should('not.be.calledWith', 'first handler true');
  cy.get('@console.log').should('not.be.calledWith', 'second handler true');

  cy.document().then(doc => cy.stub(doc, 'visibilityState').value('hidden'));
  cy.document().trigger('visibilitychange');
  cy.get('@console.log').should('be.calledWith', 'first handler false');
  cy.get('@console.log').should('be.calledWith', 'second handler false');

  cy.wait(2000);

  cy.document().then(doc => cy.stub(doc, 'visibilityState').value('visible'));
  cy.document().trigger('visibilitychange');
  cy.get('@console.log').should('be.calledWith', 'first handler true');
  cy.get('@console.log').should('not.be.calledWith', 'second handler true');
});
