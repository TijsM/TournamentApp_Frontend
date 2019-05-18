/// <reference types="Cypress" />

describe('Authentication Test', () => {
    beforeEach(() => { });
});

it('logintest'), () => {
    cy.login();
}

it('login page', () => {
    cy.visit("http://localhost:4200/");
    cy.get('[data-cy=txtLoginMail]').type('novak.djokovich@gmail.com');
    cy.get('[data-cy=txtLoginPassword]').type('P@ssword1111');
    cy.get('[data-cy=submitLogin]').click();
    cy.get('[data-cy=rankingTable]');
})