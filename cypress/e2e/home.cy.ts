describe('Homepage test', () => {
  before(() => {
    // Disable all uncaught exception handling
    Cypress.on('uncaught:exception', () => false);
  });

  beforeEach(() => {
    // Configure long timeout
    Cypress.config('defaultCommandTimeout', 10000);

    // Visit homepage
    cy.visit('/', {
      failOnStatusCode: false
    });
  });

  it('should display projects section', () => {
    // Check if projects section exists
    cy.get('[data-cy="project-section"]').should('exist');
    
    // Check if at least one project card is displayed
    cy.get('[data-cy="project-card"]').should('have.length.at.least', 1);
  });
}); 