/// <reference types="Cypress" />

it('login page', () => {
    cy.visit("http://localhost:4200/");
    cy.get('[data-cy=txtLoginMail]').type('david.gofin@tv.be');
    cy.get('[data-cy=txtLoginPassword]').type('P@ssword1111');
    cy.get('[data-cy=submitLogin]').click();
})

it("route to ranking", () => {
    cy.server({ delay: 2000 });
    cy.route({
        method: 'GET',
        url: 'http://localhost:4200/api/Tournament/GiveRanking/2',
        status: 200,
        response: 'fixture:UsersMen.json'
    });

    cy.server({ delay: 2000 });
    cy.route({
        method: 'GET',
        url: "http://localhost:4200/api/Match/GetMatchesVanSpeler/7",
        Response: 'fixture:Rafael.json'
    })

    cy.get('[data-cy=rankingTable]');
    cy.get('[data-cy=rankingTable]').find('tr').should('have.length', 6)
    cy.get('[data-cy=viewDetails]').first().click()

})

it("cant challenge", () => {
    cy.get('[data-cy=buttonBack]'); 
    cy.get('[data-cy=btnCantChallenge]');
})



