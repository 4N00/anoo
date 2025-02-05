describe('Admin Panel', () => {
  beforeEach(() => {
    // Mock Supabase auth and login as admin
    cy.mockSupabaseAuth();
    cy.login('admin@example.com', 'password123');
  });

  afterEach(() => {
    cy.clearLocalStorageAndCookies();
  });

  it('should create a new project', () => {
    const project = {
      title: 'Test Project',
      description: 'This is a test project',
      imageUrl: 'https://example.com/image.jpg',
      tags: ['test', 'cypress'],
      featured: false,
    };

    // Navigate to admin panel
    cy.visit('/admin');

    // Click add new project button
    cy.contains('button', 'Add New Project').click();

    // Fill in project form
    cy.get('input[name="title"]').type(project.title);
    cy.get('textarea[name="description"]').type(project.description);
    cy.get('input[name="imageUrl"]').type(project.imageUrl);

    // Add tags
    project.tags.forEach(tag => {
      cy.get('input[placeholder*="tags"]').type(`${tag}{enter}`);
    });

    // Submit form
    cy.contains('button', 'Create Project').click();

    // Verify project was created
    cy.contains(project.title).should('be.visible');
    cy.contains(project.description).should('be.visible');
  });

  it('should edit an existing project', () => {
    const updatedTitle = 'Updated Project Title';

    // Create a test project first
    cy.createProject({
      title: 'Original Project',
      description: 'Original description',
      imageUrl: 'https://example.com/image.jpg',
      tags: ['test'],
      featured: false,
    });

    // Navigate to admin panel
    cy.visit('/admin');

    // Click edit button on the project
    cy.contains('Original Project')
      .parent()
      .within(() => {
        cy.contains('button', 'Edit').click();
      });

    // Update project title
    cy.get('input[name="title"]')
      .clear()
      .type(updatedTitle);

    // Submit form
    cy.contains('button', 'Update Project').click();

    // Verify project was updated
    cy.contains(updatedTitle).should('be.visible');
  });

  it('should delete a project', () => {
    const projectTitle = 'Project to Delete';

    // Create a test project first
    cy.createProject({
      title: projectTitle,
      description: 'This project will be deleted',
      imageUrl: 'https://example.com/image.jpg',
      tags: ['test'],
      featured: false,
    });

    // Navigate to admin panel
    cy.visit('/admin');

    // Click delete button and confirm
    cy.contains(projectTitle)
      .parent()
      .within(() => {
        cy.contains('button', 'Delete').click();
      });

    // Confirm deletion in alert
    cy.on('window:confirm', () => true);

    // Verify project was deleted
    cy.contains(projectTitle).should('not.exist');
  });

  it('should toggle project featured status', () => {
    const projectTitle = 'Featured Project Test';

    // Create a test project first
    cy.createProject({
      title: projectTitle,
      description: 'Testing featured status',
      imageUrl: 'https://example.com/image.jpg',
      tags: ['test'],
      featured: false,
    });

    // Navigate to admin panel
    cy.visit('/admin');

    // Find project and click featured checkbox
    cy.contains(projectTitle)
      .parent()
      .within(() => {
        cy.get('input[name="featured"]').click();
      });

    // Verify featured status was updated
    cy.contains(projectTitle)
      .parent()
      .within(() => {
        cy.get('input[name="featured"]').should('be.checked');
      });
  });

  it('should validate required fields', () => {
    // Navigate to admin panel
    cy.visit('/admin');

    // Click add new project button
    cy.contains('button', 'Add New Project').click();

    // Try to submit empty form
    cy.contains('button', 'Create Project').click();

    // Verify validation errors
    cy.contains('Title is required').should('be.visible');
    cy.contains('Description is required').should('be.visible');
    cy.contains('Invalid image URL').should('be.visible');
  });
});