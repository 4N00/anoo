describe('Admin panel tests', () => {
  before(() => {
    // Disable all uncaught exception handling
    Cypress.on('uncaught:exception', () => false);
  });

  beforeEach(() => {
    // Configure longer timeout
    Cypress.config('defaultCommandTimeout', 10000);

    // Visit login page and login
    cy.visit('/login', {
      failOnStatusCode: false
    });
    
    // Login before each test
    cy.get('[data-cy="email-input"]').should('be.visible').type(Cypress.env('ADMIN_EMAIL'));
    cy.get('[data-cy="password-input"]').should('be.visible').type(Cypress.env('ADMIN_PASSWORD'));
    cy.get('[data-cy="login-button"]').should('be.visible').click();
    
    // Wait for redirect and ensure we're fully loaded
    cy.url().should('include', '/admin');
    
    // Wait for the admin panel to be loaded
    cy.get('[data-cy="admin-projects-table"]', { timeout: 10000 }).should('exist');
  });

  it('should display projects in admin panel', () => {
    // Wait for and verify projects are loaded
    cy.get('[data-cy="admin-projects-table"]').should('be.visible');
    
    // Check if at least one project row exists and is visible
    cy.get('[data-cy="admin-project-row"]')
      .should('have.length.at.least', 1)
      .first()
      .should('be.visible');
    
    // Check if project data is displayed and visible
    cy.get('[data-cy="admin-project-row"]')
      .first()
      .within(() => {
        cy.get('[data-cy="project-title"]')
          .should('be.visible')
          .should('not.be.empty');
      });
  });
}); 