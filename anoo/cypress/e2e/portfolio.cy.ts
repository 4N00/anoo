describe('Portfolio Page', () => {
  beforeEach(() => {
    // Create some test projects
    cy.createProject({
      title: 'Featured Project',
      description: 'This is a featured project',
      imageUrl: 'https://example.com/featured.jpg',
      tags: ['featured', 'test'],
      featured: true,
    });

    cy.createProject({
      title: 'Regular Project',
      description: 'This is a regular project',
      imageUrl: 'https://example.com/regular.jpg',
      tags: ['test'],
      featured: false,
    });

    // Visit the portfolio page
    cy.visit('/');
  });

  afterEach(() => {
    // Clean up test data
    cy.clearLocalStorageAndCookies();
  });

  it('should display projects correctly', () => {
    // Check if projects are visible
    cy.contains('Featured Project').should('be.visible');
    cy.contains('Regular Project').should('be.visible');

    // Check if project details are displayed
    cy.contains('This is a featured project').should('be.visible');
    cy.contains('This is a regular project').should('be.visible');

    // Check if tags are displayed
    cy.contains('featured').should('be.visible');
    cy.contains('test').should('be.visible');
  });

  it('should filter projects by tag', () => {
    // Click on 'featured' tag filter
    cy.contains('button', 'featured').click();

    // Should show featured project
    cy.contains('Featured Project').should('be.visible');

    // Should not show regular project
    cy.contains('Regular Project').should('not.exist');

    // Reset filter
    cy.contains('button', 'All Projects').click();

    // Should show all projects again
    cy.contains('Featured Project').should('be.visible');
    cy.contains('Regular Project').should('be.visible');
  });

  it('should handle project links correctly', () => {
    // Create a project with links
    cy.createProject({
      title: 'Project with Links',
      description: 'Project with GitHub and live links',
      imageUrl: 'https://example.com/links.jpg',
      githubUrl: 'https://github.com/example/project',
      liveUrl: 'https://example.com/live',
      tags: ['test'],
      featured: false,
    });

    cy.reload();

    // Find project card
    cy.contains('Project with Links')
      .parent()
      .within(() => {
        // Check if links exist and have correct attributes
        cy.contains('a', 'View Live')
          .should('have.attr', 'href', 'https://example.com/live')
          .should('have.attr', 'target', '_blank')
          .should('have.attr', 'rel', 'noopener noreferrer');

        cy.contains('a', 'View Code')
          .should('have.attr', 'href', 'https://github.com/example/project')
          .should('have.attr', 'target', '_blank')
          .should('have.attr', 'rel', 'noopener noreferrer');
      });
  });

  it('should lazy load images', () => {
    // Check if images have loading="lazy"
    cy.get('img').each(($img) => {
      cy.wrap($img).should('have.attr', 'loading', 'lazy');
    });
  });

  it('should be responsive', () => {
    // Test mobile view
    cy.viewport('iphone-x');
    cy.get('[data-testid="project-grid"]').should('have.css', 'grid-template-columns', '1fr');

    // Test tablet view
    cy.viewport('ipad-2');
    cy.get('[data-testid="project-grid"]').should('have.css', 'grid-template-columns', 'repeat(2, 1fr)');

    // Test desktop view
    cy.viewport('macbook-15');
    cy.get('[data-testid="project-grid"]').should('have.css', 'grid-template-columns', 'repeat(3, 1fr)');
  });

  it('should handle empty state gracefully', () => {
    // Delete all projects
    cy.window().then((win) => {
      win.indexedDB.deleteDatabase('your-database-name');
    });
    cy.reload();

    // Check for empty state message
    cy.contains('No projects found').should('be.visible');
  });

  it('should optimize images', () => {
    // Check if images are served through Next.js Image component
    cy.get('img').each(($img) => {
      // Next.js Image optimization adds a data-nimg attribute
      cy.wrap($img).should('have.attr', 'data-nimg');
    });
  });

  it('should handle errors gracefully', () => {
    // Simulate failed image load
    cy.intercept('GET', '**/*.jpg', {
      statusCode: 404,
    });
    cy.reload();

    // Check if fallback image or error state is shown
    cy.get('img[alt="Project thumbnail"]')
      .should('have.attr', 'src')
      .and('include', 'fallback-image.jpg');
  });
});