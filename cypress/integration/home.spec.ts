describe("Home Page", () => {

  it("should display a list of courses", () => {

    cy.fixture('courses.json').as('coursesJSON');

    // must have
    cy.server();

    // before route
    cy.route('/api/courses', '@coursesJSON').as('courses');

    cy.visit("/");

    cy.contains("All Courses");

    cy.wait('@courses');

    cy.get('mat-card').should('have.length', 9);


  });
});
