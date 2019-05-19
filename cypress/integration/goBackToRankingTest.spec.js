/// <reference types="Cypress" />

it('login page', () => {
    cy.visit("http://localhost:4200/");
    cy.get('[data-cy=txtLoginMail]').type('novak.djokovich@gmail.com');
    cy.get('[data-cy=txtLoginPassword]').type('P@ssword1111');
    cy.get('[data-cy=submitLogin]').click();
})

it("route to ranking", () => {
    cy.server();
    cy.route({
        method: 'GET',
        url: 'http://localhost:4200/api/Tournament/GiveRanking/2',
        status: 200,
        response: 'fixture:UsersMen.json'
    });

    cy.get('[data-cy=rankingTable]');
    cy.get('[data-cy=rankingTable]').find('tr').should('have.length', 6)
     cy.get('[data-cy=viewDetails]').first().click()
    
    // cy.get('[data-cy=buttonBack]').click();
})

it("route to userdetails", () => {
    cy.server();
    cy.route({
        method: 'GET',
        url: "http://localhost:4200/api/Match/GetMatchesVanSpeler/7",
        Response: 'fixture:Rafael.json'
    })

    cy.wait(1000)
     cy.get('[data-cy=buttonBack]');
})

it("route to userdetails", () => {
    cy.server();
    cy.route({
        method: 'GET',
        url: 'http://localhost:4200/api/Tournament/GiveRanking/2',
        status: 200,
        response: 'fixture:UsersMen.json'
    });

    cy.get('[data-cy=buttonBack]').click();
    cy.get('[data-cy=rankingTable]');
})

