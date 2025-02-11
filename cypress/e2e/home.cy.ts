describe('Admin login test', () => {
  before(() => {
    // Disable all uncaught exception handling
    Cypress.on('uncaught:exception', () => false);
  });

  beforeEach(() => {
    // Configure long timeout
    Cypress.config('defaultCommandTimeout', 10000);

    // Visit login page
    cy.visit('/login', {
      failOnStatusCode: false
    });
  });

  it('should login and redirect to admin dashboard', () => {
    // Type credentials
    cy.get('[data-cy="email-input"]').type(Cypress.env('ADMIN_EMAIL'));
    cy.get('[data-cy="password-input"]').type(Cypress.env('ADMIN_PASSWORD'));
    
    // Click login button
    cy.get('[data-cy="login-button"]').click();

    // Verify redirect to admin page
    cy.url().should('include', '/admin');
  });
}); 