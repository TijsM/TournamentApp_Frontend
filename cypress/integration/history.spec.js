/// <reference types="Cypress" />

import { find } from "tslint/lib/utils";

Cypress.LocalStorage.clear = function (keys, ls, rs) {
    if (keys) {
        return clear.apply(this.arguments)
    }
}


it('login page', () => {
    cy.visit("http://localhost:4200/");
    cy.get('[data-cy=txtLoginMail]').type('novak.djokovich@gmail.com');
    cy.get('[data-cy=txtLoginPassword]').type('P@ssword1111');
    cy.get('[data-cy=submitLogin]').click();
})

it('go to history', () => {
    cy.server()
    cy.route({
        method: 'GET',
        url: 'https://tournamentappapi.azurewebsites.net/api/Match',
        status: 200,
        response: 'fixture:allMatches.json'
    });


    cy.route({
        method: 'GET',
        url: 'https://tournamentappapi.azurewebsites.net/api/Match/GetMatchesVanSpeler/4',
        status: 200,
        response: 'fixture:matchesNovak.json'
    });

    cy.wait(2000);
    cy.get('[data-cy=history]').click();
})


it('controleer personal history', () => {
    cy.get('[data-cy=personal]');
    cy.get('[data-cy=personal]').find('[data-cy=won]').should('have.length', 5)
    cy.get('[data-cy=personal]').find('[data-cy=lost]').should('have.length', 2)
    // cy.get('[data-cy=won]').;  
    // cy.get('[data-cy=lost]');
})

it('controleer general history', () => {
    cy.get('#mat-tab-label-1-1').click();
    cy.get('[data-cy=general]');
    cy.get('[data-cy=personal]');
    cy.get('[data-cy=container]').find('table').should('have.length', 27);
    
})
