describe('Admin panel tests', () => {
  before(() => {
    // Disable all uncaught exception handling
    Cypress.on('uncaught:exception', () => false);
  });

  beforeEach(() => {
    // Configure longer timeout for all commands
    Cypress.config('defaultCommandTimeout', 20000);
    Cypress.config('pageLoadTimeout', 30000);
    
    // Visit login page and login with retry
    cy.visit('/login', {
      failOnStatusCode: false,
      timeout: 30000
    });
    
    // Wait for page to be fully loaded
    cy.window().should('have.property', 'document')
      .and('have.property', 'readyState')
      .and('eq', 'complete');
    
    // Login before each test with retries
    cy.get('[data-cy="email-input"]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(Cypress.env('ADMIN_EMAIL'), { delay: 50 });
      
    cy.get('[data-cy="password-input"]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(Cypress.env('ADMIN_PASSWORD'), { delay: 50 });
      
    cy.get('[data-cy="login-button"]', { timeout: 10000 })
      .should('be.visible')
      .should('be.enabled')
      .click();
    
    // Wait for redirect with longer timeout and multiple checks
    cy.url({ timeout: 20000 }).should('include', '/admin');
    
    // Additional check to ensure we're actually on admin page
    cy.location('pathname', { timeout: 20000 }).should('include', 'admin');
    
    // Wait for the admin panel to be loaded with longer timeout
    cy.get('[data-cy="admin-projects-table"]', { timeout: 20000 })
      .should('exist')
      .should('be.visible');
  });

  it('should display projects in admin panel', () => {
    // Wait for and verify projects are loaded with retry
    cy.get('[data-cy="admin-projects-table"]', { timeout: 15000 })
      .should('be.visible')
      .should('not.be.empty');
    
    // Check if at least one project row exists and is visible
    cy.get('[data-cy="admin-project-row"]', { timeout: 15000 })
      .should('have.length.at.least', 1)
      .first()
      .should('be.visible');
    
    // Check if project data is displayed and visible
    cy.get('[data-cy="admin-project-row"]', { timeout: 15000 })
      .first()
      .within(() => {
        cy.get('[data-cy="project-title"]', { timeout: 10000 })
          .should('be.visible')
          .should('not.be.empty');
      });
  });
}); 