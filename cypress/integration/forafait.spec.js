/// <reference types="Cypress" />


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

it("route to ranking", () => {
    cy.server({});
    cy.route({
        method: 'GET',
        url: 'https://tournamentappapi.azurewebsites.net/api/Tournament/GiveRanking/2',
        status: 200,
        response: 'fixture:UsersMen.json'
    });

    cy.route({
        method: 'GET',
        url: "https://tournamentappapi.azurewebsites.net/api/Users/7",
        Response: 'fixture:Rafael.json'
    })

    cy.route({
        method: 'GET',
        url: "https://tournamentappapi.azurewebsites.net/api/Users/4",
        Response: 'fixture:Novak.json'
    })


    cy.get('[data-cy=rankingTable]');
    cy.get('[data-cy=rankingTable]').find('tr').should('have.length', 6)
    cy.get('[data-cy=viewDetails]').first().click()

})

it("challenge", () => {
    cy.server();
    cy.route({
        method: 'GET',
        url: "https://tournamentappapi.azurewebsites.net/api/Users/7",
        Response: 'fixture:Rafael.json'
    })

    cy.server();
    cy.route({
        method: 'GET',
        url: "https://tournamentappapi.azurewebsites.net/api/Users/4",
        Response: 'fixture:Novak.json'
    })

    cy.get('[data-cy=buttonBack]');
    cy.wait(5000);
    cy.get('[data-cy=btnChallenge').click();
    cy.wait(2000)
})

it("confirm", () => {
    cy.get('[data-cy=confirm').click();
})


it("go to forfait", () => {
    cy.get('[data-cy=wantsForfait').click();
})

it("confirm forfait", () => {
    cy.get('[data-cy=confirmForfait').click();
})

it("go back to ranking", () => {
    cy.get('[data-cy=confirmButton').click();
})



