/// <reference types="Cypress" />
describe('Run Test', function () {
  it('Run App', function () {
    cy.visit('http://localhost:4200');
    cy.get('[data-cy=submitLogin]').should("be.enabled");
  });
});
