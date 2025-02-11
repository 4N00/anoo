describe('Admin panel tests', () => {
  before(() => {
    // Disable all uncaught exception handling
    Cypress.on('uncaught:exception', () => false);
  });

  beforeEach(() => {
    // Configure long timeout
    Cypress.config('defaultCommandTimeout', 10000);

    // Visit login page and login
    cy.visit('/login', {
      failOnStatusCode: false
    });
    
    // Login before each test
    cy.get('[data-cy="email-input"]').type(Cypress.env('ADMIN_EMAIL'));
    cy.get('[data-cy="password-input"]').type(Cypress.env('ADMIN_PASSWORD'));
    cy.get('[data-cy="login-button"]').click();
    
    // Wait for redirect
    cy.url().should('include', '/admin');
  });

  it('should display projects in admin panel', () => {
    // Check if projects table exists
    cy.get('[data-cy="admin-projects-table"]').should('exist');
    
    // Check if at least one project row exists
    cy.get('[data-cy="admin-project-row"]').should('have.length.at.least', 1);
    
    // Check if project data is displayed
    cy.get('[data-cy="admin-project-row"]').first().within(() => {
      cy.get('[data-cy="project-title"]').should('not.be.empty');
    });
  });
}); 